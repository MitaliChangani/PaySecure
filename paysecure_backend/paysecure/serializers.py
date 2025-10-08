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

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = [
            "id", "bank_name", "account_number", "ifsc_code",
            "upi_id", "qr_code", "limit", "is_active", "created_at"
        ]
        read_only_fields = ["id", "created_at"]

class WalletSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    bank_account = BankAccountSerializer(read_only=True)

    class Meta:
        model = Wallet
        fields = "__all__"

class DepositRequestSerializer(serializers.ModelSerializer):
    franchise_account = BankAccountSerializer(read_only=True)

    class Meta:
        model = DepositRequest
        fields = [
            "id", "amount", "status", "franchise_account",
            "user_utr", "user_amount", "franchise_utr", "franchise_amount",
            "created_at"
        ]
        read_only_fields = [
            "id", "status", "franchise_account", "created_at",
            "franchise_utr", "franchise_amount"
        ]

    def create(self, validated_data):
        """Auto-attach logged-in user"""
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            validated_data["user"] = request.user
        return super().create(validated_data)
    

class WithdrawalRequestSerializer(serializers.ModelSerializer):
    assigned_account = BankAccountSerializer(read_only=True)

    class Meta:
        model = WithdrawalRequest
        fields = [
            "id", "amount", "status", "assigned_franchise", "assigned_account",
            "accepted_by_franchise", "user_utr", "franchise_utr",
            "bank_account", "ifsc_code", "upi_id", "qr_code",
            "created_at", "completed_at"
        ]
        read_only_fields = [
            "id", "status", "assigned_franchise", "assigned_account",
            "accepted_by_franchise", "created_at", "completed_at", "franchise_utr"
        ]

    def create(self, validated_data):
        """Auto-attach logged-in user"""
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            validated_data["user"] = request.user
        return super().create(validated_data)
    
    

class TransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    franchise = UserSerializer(read_only=True)
    franchise_account = BankAccountSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"
        

class ForgotPasswordSerializer(serializers.Serializer):
    username = serializers.CharField()

class ResetPasswordSerializer(serializers.Serializer):
    username = serializers.CharField()
    otp = serializers.CharField()
    new_password = serializers.CharField()


