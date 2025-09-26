from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import uuid
from datetime import datetime, timedelta
from django.conf import settings 



class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('franchise', 'Franchise'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.username} ({self.role})"
    
class UserProfile(models.Model):
    user = models.OneToOneField("CustomUser", on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.username}"


class Wallet(models.Model):
    owner = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="wallets")
    bank_account = models.ForeignKey("BankAccount", on_delete=models.CASCADE, null=True, blank=True)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        unique_together = ('owner', 'bank_account')

    def __str__(self):
        if self.bank_account:
            return f"{self.owner.username} - {self.bank_account.bank_name} Wallet ({self.balance})"
        return f"{self.owner.username} - Main Wallet ({self.balance})"

class BankAccount(models.Model):
    franchise = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="bank_accounts")
    bank_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50)
    ifsc_code = models.CharField(max_length=20)
    upi_id = models.CharField(max_length=100, blank=True, null=True)
    qr_code = models.ImageField(upload_to="qr_codes/", blank=True, null=True)
    limit = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.franchise.username} - {self.bank_name} ({'Active' if self.is_active else 'Inactive'})"


class DepositRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )

    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="deposit_requests")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    franchise_account = models.ForeignKey("BankAccount", on_delete=models.SET_NULL, null=True, blank=True)
    utr_number = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Deposit {self.amount} by {self.user.username} - {self.status}"

class WithdrawalRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )

    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="withdrawal_requests")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    assigned_franchise = models.ForeignKey("CustomUser", on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_withdrawals")
    utr_number = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Withdrawal {self.amount} by {self.user.username} - {self.status}"

import uuid

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = (
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
    )

    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="transactions")
    franchise = models.ForeignKey("CustomUser", on_delete=models.SET_NULL, null=True, blank=True, related_name="franchise_transactions")
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    utr_number = models.CharField(max_length=100, null=True, blank=True)
    order_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    transaction_id = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=20, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} {self.amount} ({self.status}) - {self.user.username}"

class PasswordResetOTP(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_verified = models.BooleanField(default=False)

    def is_valid(self):
        return timezone.now() <= self.expires_at


    def __str__(self):
        return f"OTP for {self.user.username} - {'Valid' if self.is_valid() else 'Expired'}"
