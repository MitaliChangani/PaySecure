from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import *
from .serializers import *
from .permissions import IsAdmin, IsFranchise, IsNormalUser

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

CustomUser = get_user_model()

# ---------------------------
# User Registration
# ---------------------------
class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


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



# ---------------------------
# Admin assigns Withdrawal to Franchise
# ---------------------------
class AssignFranchiseView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, withdrawal_id, franchise_id):
        try:
            withdrawal = WithdrawalRequest.objects.get(id=withdrawal_id)
            franchise = Franchise.objects.get(id=franchise_id)

            withdrawal.franchise = franchise
            withdrawal.status = "assigned"
            withdrawal.save()

            return Response({"message": "Franchise assigned successfully"}, status=status.HTTP_200_OK)

        except WithdrawalRequest.DoesNotExist:
            return Response({"error": "Withdrawal request not found"}, status=status.HTTP_404_NOT_FOUND)
        except Franchise.DoesNotExist:
            return Response({"error": "Franchise not found"}, status=status.HTTP_404_NOT_FOUND)


# ---------------------------
# Franchise marks Withdrawal as Paid
# ---------------------------
class MarkPaidView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, withdrawal_id):
        try:
            withdrawal = WithdrawalRequest.objects.get(id=withdrawal_id)

            # Only assigned franchise can mark as paid
            if withdrawal.franchise.user != request.user:
                return Response({"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

            withdrawal.status = "paid"
            withdrawal.save()

            # Save transaction history
            TransactionHistory.objects.create(
                user=withdrawal.user,
                franchise=withdrawal.franchise,
                amount=withdrawal.amount,
                status="completed"
            )

            return Response({"message": "Withdrawal marked as paid"}, status=status.HTTP_200_OK)

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
        try:
            # Expecting client to send refresh token
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token
            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid token or already blacklisted"}, status=status.HTTP_400_BAD_REQUEST)
