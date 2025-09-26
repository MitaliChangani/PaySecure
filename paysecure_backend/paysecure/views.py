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
from django.contrib.auth import logout, login
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
import random
from datetime import datetime, timedelta



def get_csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set"})

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
   
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        login(request, user)  # Django session stored in HttpOnly cookie

        return Response({
            "message": "Login successful",
            "id": user.id,
            "username": user.username,
            "role": user.role,
        }, status=status.HTTP_200_OK)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role if hasattr(user, "role") else "user"
    })



@api_view(["POST"])
@permission_classes([AllowAny])
def logout_view(request):
    response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    response.delete_cookie("access")
    response.delete_cookie("refresh")
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def whoami(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role
    })

    
@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    username = request.data.get("username")
    User = get_user_model()
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # Invalidate previous OTPs
    PasswordResetOTP.objects.filter(user=user, is_verified=False).update(is_verified=True)
    
    otp = str(random.randint(100000, 999999))
    expires_at = timezone.now() + timedelta(minutes=5)

    # Create new OTP
    PasswordResetOTP.objects.create(user=user, otp=otp, expires_at=expires_at)
    
    print(f"OTP for {username}: {otp}")  # for testing
    
    return Response({"detail": "OTP sent successfully"})



@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    username = request.data.get("username")
    otp = request.data.get("otp")
    new_password = request.data.get("new_password")


    User = get_user_model()
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Get latest OTP for the user
    otp_entry = PasswordResetOTP.objects.filter(user=user, otp=otp, is_verified=False).last()
    print("OTP entry:", otp_entry, "Valid?", otp_entry.is_valid() if otp_entry else "No OTP")
    if not otp_entry or not otp_entry.is_valid():
        return Response({"detail": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

    # Reset password
    user.set_password(new_password)
    user.save()

    # Mark OTP as used
    otp_entry.is_verified = True
    otp_entry.save()

    return Response({"detail": "Password reset successful"})



class BankAccountListCreateView(generics.ListCreateAPIView):
    serializer_class = BankAccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BankAccount.objects.filter(franchise=self.request.user)

    def perform_create(self, serializer):
        serializer.save(franchise=self.request.user)
        
        
class BankAccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BankAccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BankAccount.objects.filter(franchise=self.request.user)
    
    # ---------- Franchise Pay-In = Withdrawal Requests ----------
class FranchisePayInView(generics.ListAPIView):
    serializer_class = WithdrawalRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WithdrawalRequest.objects.filter(assigned_franchise=self.request.user)


# ---------- Franchise Pay-Out = Deposit Requests ----------
class FranchisePayOutView(generics.ListAPIView):
    serializer_class = DepositRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DepositRequest.objects.filter(franchise_account__franchise=self.request.user)

    
    
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def accept_withdrawal(request, pk):
    try:
        withdrawal = WithdrawalRequest.objects.get(pk=pk, assigned_franchise=request.user)
    except WithdrawalRequest.DoesNotExist:
        return Response({"error": "Not found or not assigned to you"}, status=404)

    withdrawal.mark_processing()
    return Response({"success": f"Withdrawal {pk} is now processing."})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_assign_withdrawal(request, pk):
    user = request.user
    if user.role != "admin":
        return Response({"error": "Only admin can assign withdrawals"}, status=403)

    try:
        withdrawal = WithdrawalRequest.objects.get(pk=pk)
    except WithdrawalRequest.DoesNotExist:
        return Response({"error": "Withdrawal request not found"}, status=404)

    # Assign to random franchise
    franchises = CustomUser.objects.filter(role="franchise")
    if not franchises.exists():
        return Response({"error": "No franchises available"}, status=400)

    # pick random franchise
    franchise = random.choice(franchises)
    # pick active bank account of franchise
    account = franchise.bank_accounts.filter(is_active=True).first()
    if not account:
        return Response({"error": f"Franchise {franchise.username} has no active bank account"}, status=400)

    withdrawal.assigned_franchise = franchise
    withdrawal.assigned_account = account
    withdrawal.assigned_at = timezone.now()
    withdrawal.accepted_by_franchise = False
    withdrawal.status = "assigned"
    withdrawal.save()

    return Response({
        "success": f"Withdrawal {pk} assigned to franchise {franchise.username}",
        "franchise_id": franchise.id,
        "account_id": account.id
    })



def assign_to_random_franchise(request_obj):
    franchises = CustomUser.objects.filter(role="franchise")
    if not franchises.exists():
        return None

    franchise = random.choice(franchises)

    # pick active account of that franchise
    account = franchise.bank_accounts.filter(is_active=True).first()
    if not account:
        return None

    request_obj.assigned_franchise = franchise
    request_obj.assigned_account = account
    request_obj.assigned_at = timezone.now()
    request_obj.accepted_by_franchise = False
    request_obj.status = "assigned"
    request_obj.save()

    return franchise


# franchise accept

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def accept_assigned_withdrawal(request, pk):
    try:
        withdrawal = WithdrawalRequest.objects.get(pk=pk, assigned_franchise=request.user)
    except WithdrawalRequest.DoesNotExist:
        return Response({"error": "Not assigned to you"}, status=404)

    # Accept request
    withdrawal.accepted_by_franchise = True
    withdrawal.status = "processing"
    withdrawal.save()

    return Response({"success": f"Withdrawal {pk} accepted by {request.user.username}."})



@api_view(["POST"])
@permission_classes([IsFranchise])
def complete_withdrawal(request, pk):
    try:
        withdrawal = WithdrawalRequest.objects.get(pk=pk, franchise__user=request.user)
    except WithdrawalRequest.DoesNotExist:
        return Response({"error": "Withdrawal not found"}, status=404)

    utr_number = request.data.get("utr_number")
    amount = request.data.get("amount")
    razorpay_payment_id = request.data.get("razorpay_payment_id")

    # CASE 1: Razorpay handled payment
    if razorpay_payment_id:
        withdrawal.status = "completed"
        withdrawal.utr_number = f"RZP-{razorpay_payment_id}"
        withdrawal.save()
        return Response({"success": "Withdrawal completed via Razorpay"})

    # CASE 2: Manual entry (external payment)
    if not utr_number or not amount:
        return Response({"error": "UTR number and amount required for manual completion"},
                        status=400)

    # Compare with user’s provided details
    if (withdrawal.utr_number == utr_number and 
        str(withdrawal.amount) == str(amount)):
        withdrawal.status = "completed"
        withdrawal.save()
        return Response({"success": "Withdrawal completed manually"})
    else:
        withdrawal.status = "pending_verification"
        withdrawal.save()
        return Response({"warning": "UTR or amount mismatch. Pending verification."})


class DepositRequestCreateView(generics.CreateAPIView):
    serializer_class = DepositRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Only amount is sent by user; status = pending
        serializer.save(user=self.request.user, status="pending")

class WithdrawalRequestCreateView(generics.CreateAPIView):
    serializer_class = WithdrawalRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, status="pending", accepted_by_franchise=False)



class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(franchise=self.request.user)
    
    
class WalletListView(generics.ListAPIView):
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wallet.objects.filter(owner=self.request.user)