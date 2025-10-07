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
    franchise = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = BankAccount
        fields = "__all__"

class WalletSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    bank_account = BankAccountSerializer(read_only=True)

    class Meta:
        model = Wallet
        fields = "__all__"

class DepositRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = DepositRequest
        fields = "__all__"

class WithdrawalRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    assigned_franchise = UserSerializer(read_only=True)
    assigned_account = BankAccountSerializer(read_only=True)

    class Meta:
        model = WithdrawalRequest
        fields = "__all__"

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


