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
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import PasswordResetOTP
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

