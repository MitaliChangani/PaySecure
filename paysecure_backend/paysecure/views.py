from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from .models import *
from .serializers import *
from .permissions import IsAdmin, IsFranchise, IsNormalUser
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView


CustomUser = get_user_model()

# ---------------------------
# User Registration
# ---------------------------
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    # def perform_create(self, serializer):
    #     user = serializer.save()
    #     if user.role == "franchise":
    #         Franchise.objects.create(user=user)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)

            response = Response({
                "id": user.id,
                "username": user.username,
                "role": user.role
            }, status=status.HTTP_200_OK)

            # Set HttpOnly cookies
            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True,
                secure=False,  # True in production with HTTPS
                samesite='Lax',
                
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=False,
                samesite='Lax',
                
            )
            return response
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# ---------------------------
# Franchise Profile (only franchise can edit their own)
# ---------------------------
class FranchiseProfileView(generics.RetrieveUpdateAPIView):
    queryset = Franchise.objects.all()
    serializer_class = FranchiseProfileSerializer
    permission_classes = [IsFranchise]

    def get_object(self):
        return Franchise.objects.get(user=self.request.user)
    
class FranchiseAccountListView(generics.ListAPIView):
    serializer_class = FranchiseAccountSerializer
    permission_classes = [IsFranchise]

    def get_queryset(self):
        return FranchiseAccount.objects.filter(franchise__user=self.request.user)


# Franchise adds a new account
class FranchiseAccountCreateView(generics.CreateAPIView):
    serializer_class = FranchiseAccountCreateSerializer
    permission_classes = [IsFranchise]

    def perform_create(self, serializer):
        franchise = Franchise.objects.get(user=self.request.user)
        serializer.save(franchise=franchise)

# ---------------------------
# User creates Withdrawal Request
# ---------------------------
class WithdrawalRequestCreateView(generics.CreateAPIView):
    queryset = WithdrawalRequest.objects.all()
    serializer_class = WithdrawalRequestSerializer
    permission_classes = [IsNormalUser]

    def perform_create(self, serializer):
        account_id = self.request.data.get('franchise_account_id')
        if not account_id:
            raise serializers.ValidationError({"franchise_account_id": "This field is required."})

        try:
            account = FranchiseAccount.objects.get(id=account_id)
        except FranchiseAccount.DoesNotExist:
            raise serializers.ValidationError({"franchise_account_id": "Invalid account id."})

        serializer.save(
            user=self.request.user,
            franchise=account.franchise,
            franchise_account=account
        )

class FranchiseAccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET / PUT / DELETE for a single franchise account.
    Only the franchise that owns the account can use these.
    """
    serializer_class = FranchiseAccountSerializer
    permission_classes = [IsFranchise]

    def get_queryset(self):
        # Only allow franchise owner to access their own accounts
        return FranchiseAccount.objects.filter(franchise__user=self.request.user)

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk=self.kwargs.get('pk'))

# ---------------------------
# Admin assigns Withdrawal to Franchise
# ---------------------------
class AssignFranchiseView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, withdrawal_id, franchise_id):
        try:
            withdrawal = WithdrawalRequest.objects.get(id=withdrawal_id)
            franchise = Franchise.objects.get(id=franchise_id)

            if withdrawal.status != "pending":
                return Response(
                    {"error": f"Cannot assign. Current status: {withdrawal.status}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            withdrawal.franchise = franchise
            withdrawal.status = "processing"
            withdrawal.save()

            return Response(
                {"message": "Franchise assigned successfully, status set to processing"},
                status=status.HTTP_200_OK,
            )

        except WithdrawalRequest.DoesNotExist:
            return Response({"error": "Withdrawal request not found"}, status=status.HTTP_404_NOT_FOUND)
        except Franchise.DoesNotExist:
            return Response({"error": "Franchise not found"}, status=status.HTTP_404_NOT_FOUND)


# ---------------------------
# Franchise marks Withdrawal as Completed
# ---------------------------
class MarkCompletedView(APIView):
    permission_classes = [IsFranchise]

    def post(self, request, withdrawal_id):
        try:
            withdrawal = get_object_or_404(WithdrawalRequest, id=withdrawal_id)

            # Ensure there is an assigned franchise and it belongs to the requester
            if not withdrawal.franchise or withdrawal.franchise.user != request.user:
                return Response({"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

            # Only allow completion when processing
            if withdrawal.status != "processing":
                return Response(
                    {"error": f"Cannot complete. Current status: {withdrawal.status}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Use the model helper to clear sensitive fields + set completed_at/status
            withdrawal.mark_completed()

            # Log transaction history (transaction_type is required by model)
            TransactionHistory.objects.create(
                user=withdrawal.user,
                franchise=withdrawal.franchise,
                amount=withdrawal.amount,
                transaction_type="withdraw",
                status="completed",
            )

            return Response({"message": "Withdrawal marked as completed"}, status=status.HTTP_200_OK)

        except WithdrawalRequest.DoesNotExist:
            return Response({"error": "Withdrawal request not found"}, status=status.HTTP_404_NOT_FOUND)

# ---------------------------
# Transaction History for a User
# ---------------------------
class TransactionHistoryView(generics.ListAPIView):
    serializer_class = TransactionHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return TransactionHistory.objects.all()
        return TransactionHistory.objects.filter(user=self.request.user)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Blacklist refresh token if needed (optional)
        response = Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        # Clear cookies
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response