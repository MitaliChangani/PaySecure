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
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"
    
class UserProfile(models.Model):
    user = models.OneToOneField("CustomUser", on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.username}"



class BankAccount(models.Model):
    franchise = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="bank_accounts")
    bank_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50)
    ifsc_code = models.CharField(max_length=20)
    upi_id = models.CharField(max_length=100, blank=True, null=True)
    qr_code = models.ImageField(upload_to="qr_codes/", blank=True, null=True)
    limit = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.franchise.username} - {self.bank_name} ({'Active' if self.is_active else 'Inactive'})"


class Wallet(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="wallets")
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE, null=True, blank=True, related_name="wallets")
    balance = models.DecimalField(max_digits=14, decimal_places=2, default=0)

    class Meta:
        unique_together = ("owner", "bank_account")

    def __str__(self):
        return f"{self.owner.username} - {self.bank_account.bank_name if self.bank_account else 'Main'} ({self.balance})"



class DepositRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("assigned", "Assigned"),
        ("rejected", "Rejected"),
        ("pending_verification", "Pending Verification"),
        ("completed", "Completed"),
    ]
    user = models.ForeignKey("CustomUser", on_delete=models.CASCADE, related_name="deposit_requests")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    franchise_account = models.ForeignKey("BankAccount", on_delete=models.SET_NULL, null=True, blank=True)
    user_utr = models.CharField(max_length=100, null=True, blank=True)
    user_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    franchise_utr = models.CharField(max_length=100, null=True, blank=True)
    franchise_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Deposit {self.amount} by {self.user.username} - {self.status}"
    
    def mark_completed(self):
        self.status = "completed"
        self.save()
        # Credit wallet
        wallet, _ = Wallet.objects.get_or_create(owner=self.user, bank_account=None)
        wallet.balance += self.amount
        wallet.save()


class WithdrawalRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="withdrawal_requests")
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    assigned_franchise = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_withdrawals")
    assigned_account = models.ForeignKey(BankAccount, on_delete=models.SET_NULL, null=True, blank=True)
    assigned_at = models.DateTimeField(null=True, blank=True)   # when admin assigned to a franchise
    accepted_by_franchise = models.BooleanField(default=False)
    franchise_utr = models.CharField(max_length=100, null=True, blank=True)  # UTR provided by franchise when paying
    user_utr = models.CharField(max_length=100, null=True, blank=True)       # optionally provided by user when they deposit elsewhere
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    # optional bank details provided by user for withdraw if needed:
    bank_account = models.CharField(max_length=100, null=True, blank=True)
    ifsc_code = models.CharField(max_length=20, null=True, blank=True)
    upi_id = models.CharField(max_length=100, null=True, blank=True)
    qr_code = models.ImageField(upload_to="user_qr/", null=True, blank=True)

    def mark_assigned(self, franchise, account):
        self.assigned_franchise = franchise
        self.assigned_account = account
        self.assigned_at = timezone.now()
        self.status = "assigned"
        self.save()
        
    def needs_reassignment(self):
        if self.status == "assigned" and not self.accepted_by_franchise:
            if timezone.now() > self.assigned_at + timedelta(minutes=5):
                return True
        return False

    def mark_processing(self):
        self.status = "processing"
        self.save()

    def mark_completed(self):
        self.status = "completed"
        self.completed_at = timezone.now()
        self.save()

import uuid

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = (
        ("deposit", "Deposit"),
        ("withdraw", "Withdraw"),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="transactions")
    franchise = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="franchise_transactions")
    franchise_account = models.ForeignKey(BankAccount, on_delete=models.SET_NULL, null=True, blank=True)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    order_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    transaction_id = models.CharField(max_length=255, null=True, blank=True)  # Razorpay txn id or UTR
    utr_number = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="processing")
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    
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


