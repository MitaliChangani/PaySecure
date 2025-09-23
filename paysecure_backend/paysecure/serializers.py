from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

CustomUser = get_user_model()

# ---------------------------
# User Serializer
# ---------------------------
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'role']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            role=validated_data.get('role', 'user')
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            "id": self.user.id,
            "username": self.user.username,
            "role": self.user.role
        })
        return data


# ---------------------------
# Franchise Profile Serializer
# ---------------------------
class FranchiseAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FranchiseAccount
        fields = ['id', 'bank_name', 'bank_account_number', 'ifsc_code', 'upi_id', 'qr_code']


class FranchiseProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    accounts = FranchiseAccountSerializer(many=True, read_only=True)  # nested accounts

    class Meta:
        model = Franchise
        fields = ['id', 'user', 'accounts']

class FranchiseAccountCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FranchiseAccount
        fields = ['bank_name', 'bank_account_number', 'ifsc_code', 'upi_id', 'qr_code']

    # def create(self, validated_data):
    #     franchise = Franchise.objects.get(user=self.context['request'].user)
    #     return FranchiseAccount.objects.create(franchise=franchise, **validated_data)

# ---------------------------
# Withdrawal Request Serializer
# ---------------------------
class WithdrawalRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    franchise = FranchiseProfileSerializer(read_only=True)
    franchise_account = FranchiseAccountSerializer(read_only=True)
    franchise_account_id = serializers.IntegerField(write_only=True, required=True)

    class Meta:
        model = WithdrawalRequest
        fields = [
            'id', 'user', 'franchise', 'franchise_account', 'franchise_account_id',
            'amount', 'bank_account', 'upi_id', 'qr_code', 'status', 'created_at'
        ]




# ---------------------------
# Transaction History Serializer
# ---------------------------
class TransactionHistorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    franchise = FranchiseProfileSerializer(read_only=True)

    class Meta:
        model = TransactionHistory
        fields = ['id', 'user', 'franchise', 'amount', 'status', 'created_at']
