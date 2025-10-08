from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import uuid
from datetime import datetime, timedelta
from django.conf import settings
import random 


STATUS_CHOICES = [
    ("pending", "Pending"),
    ("assigned", "Assigned"),
    ("processing", "Processing"),
    ("rejected", "Rejected"),
    ("pending_verification", "Pending Verification"),
    ("completed", "Completed"),
]


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

class FranchiseBank(models.Model):
    franchise = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'franchise'},
        related_name='bank_accounts'
    )
    bank_name = models.CharField(max_length=100)
    account_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50)
    ifsc = models.CharField(max_length=20)
    upi_id = models.CharField(max_length=100, blank=True, null=True)
    qr_code = models.ImageField(upload_to='franchise_qr_codes/', blank=True, null=True)
    min_limit = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_limit = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    direct_payment_link = models.URLField(blank=True, null=True)  # Razorpay link
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.franchise.username} - {self.bank_name}"



class PayInRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'user'})
    customer_id = models.CharField(max_length=100)
    utr_number = models.CharField(max_length=100, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    assigned_franchise = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='payin_assigned')
    razorpay_link = models.URLField(blank=True, null=True)
    upi_id = models.CharField(max_length=100, blank=True, null=True)
    qr_code = models.ImageField(upload_to='payin_qrs/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"PayIn Request - {self.customer_id} - {self.user.username}"

    def assign_random_franchise(self):
        from .models import FranchiseBank  # avoid circular import

        # filter only franchises whose limits allow this amount
        eligible_banks = FranchiseBank.objects.filter(
            min_limit__lte=self.amount,
            max_limit__gte=self.amount
        )

        if eligible_banks.exists():
            selected_bank = random.choice(eligible_banks)
            self.assigned_franchise = selected_bank.franchise
            self.razorpay_link = selected_bank.direct_payment_link
            self.upi_id = selected_bank.upi_id
            self.qr_code = selected_bank.qr_code
            self.status = 'assigned'
            self.save()


class PayOutRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'user'})
    customer_id = models.CharField(max_length=100)
    bank_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50)
    ifsc = models.CharField(max_length=20)
    upi_id = models.CharField(max_length=100, blank=True, null=True)
    qr_code = models.ImageField(upload_to='payout_qrs/', blank=True, null=True)
    account_holder_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    assigned_franchise = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='payout_assigned')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"PayOut Request - {self.customer_id} - {self.user.username}"
