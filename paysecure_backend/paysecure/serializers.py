from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'role')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            role=validated_data.get('role', 'user')
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid username or password")
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "role"]
class ForgotPasswordSerializer(serializers.Serializer):
    username = serializers.CharField()

class ResetPasswordSerializer(serializers.Serializer):
    username = serializers.CharField()
    otp = serializers.CharField()
    new_password = serializers.CharField()


class FranchiseBankSerializer(serializers.ModelSerializer):
    franchise_name = serializers.CharField(source='franchise.username', read_only=True)

    class Meta:
        model = FranchiseBank
        fields = '__all__'
        read_only_fields = ('franchise', 'created_at', 'updated_at')


# -------------------- PAYIN SERIALIZER --------------------

class PayInRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    assigned_franchise_name = serializers.CharField(source='assigned_franchise.username', read_only=True)

    class Meta:
        model = PayInRequest
        fields = '__all__'
        read_only_fields = ('assigned_franchise', 'razorpay_link', 'upi_id', 'qr_code', 'status')


# -------------------- PAYOUT SERIALIZER --------------------

class PayOutRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    assigned_franchise_name = serializers.CharField(source='assigned_franchise.username', read_only=True)

    class Meta:
        model = PayOutRequest
        fields = '__all__'
        read_only_fields = ('assigned_franchise', 'status')

