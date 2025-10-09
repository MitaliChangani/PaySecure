from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
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

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def whoami(request):
#     user = request.user
#     return Response({
#         "id": user.id,
#         "username": user.username,
#         "email": user.email,
#         "role": user.role
#     })

    
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

# -------------------- FRANCHISE BANK MANAGEMENT --------------------

class FranchiseBankViewSet(viewsets.ModelViewSet):
    serializer_class = FranchiseBankSerializer
    permission_classes = [IsFranchise | IsAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return FranchiseBank.objects.all()
        elif user.role == 'franchise':
            return FranchiseBank.objects.filter(franchise=user)
        return FranchiseBank.objects.none()

    def perform_create(self, serializer):
        serializer.save(franchise=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_active(self, request, pk=None):
        """Activate/Deactivate a franchise bank"""
        try:
            bank = self.get_queryset().get(pk=pk)
        except FranchiseBank.DoesNotExist:
            return Response({"error": "Bank account not found"}, status=status.HTTP_404_NOT_FOUND)

        bank.is_active = not bank.is_active
        bank.save()
        return Response({
            "message": f"Bank account is now {'active' if bank.is_active else 'inactive'}."
        })


# -------------------- PAYIN MANAGEMENT --------------------

# -------------------- PAYIN MANAGEMENT --------------------
class PayInRequestViewSet(viewsets.ModelViewSet):
    serializer_class = PayInRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return PayInRequest.objects.all()
        elif user.role == 'franchise':
            return PayInRequest.objects.filter(assigned_franchise=user)
        elif user.role == 'user':
            return PayInRequest.objects.filter(user=user)
        return PayInRequest.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role != 'user':
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only normal users can create PayIn requests.")

        payin = serializer.save(user=self.request.user)
        payin.assign_random_franchise()

    def update(self, request, *args, **kwargs):
        """Custom update to allow users/franchise to add UTR and amount manually"""
        instance = self.get_object()
        user = request.user

        if user.role == 'user':
            # Users can only update UTR and amount
            allowed_fields = ['utr_number', 'amount']
        elif user.role == 'franchise':
            # Franchise can update UTR, amount, and status
            allowed_fields = ['utr_number', 'amount', 'status']
        else:
            # Admin can update all fields
            allowed_fields = None  # no restriction

        data = request.data.copy()
        if allowed_fields is not None:
            data = {key: value for key, value in data.items() if key in allowed_fields}

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# -------------------- PAYOUT MANAGEMENT --------------------
class PayOutRequestViewSet(viewsets.ModelViewSet):
    serializer_class = PayOutRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return PayOutRequest.objects.all()
        elif user.role == 'franchise':
            return PayOutRequest.objects.filter(assigned_franchise=user)
        elif user.role == 'user':
            return PayOutRequest.objects.filter(user=user)
        return PayOutRequest.objects.none()

    def perform_create(self, serializer):
        if self.request.user.role != 'user':
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only normal users can create PayOut requests.")

        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        """Custom update to allow users/franchise to add UTR and amount manually"""
        instance = self.get_object()
        user = request.user

        if user.role == 'user':
            # Users can only update UTR and amount
            allowed_fields = ['utr_number', 'amount']
        elif user.role == 'franchise':
            # Franchise can update UTR, amount, and status
            allowed_fields = ['utr_number', 'amount', 'status']
        else:
            # Admin can update all fields
            allowed_fields = None  # no restriction

        data = request.data.copy()
        if allowed_fields is not None:
            data = {key: value for key, value in data.items() if key in allowed_fields}

        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
