from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('franchise', 'Franchise'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.username} ({self.role})"


class Franchise(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, limit_choices_to={'role': 'franchise'})
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Franchise: {self.user.username}"


class FranchiseAccount(models.Model):
    franchise = models.ForeignKey(Franchise, on_delete=models.CASCADE, related_name='accounts')
    bank_name = models.CharField(max_length=100)
    bank_account_number = models.CharField(max_length=50)
    ifsc_code = models.CharField(max_length=20)
    upi_id = models.CharField(max_length=100, blank=True, null=True)
    qr_code = models.ImageField(upload_to="franchise_qr/", blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.bank_name} - {self.bank_account_number}"
    
    def as_dict(self):
        """Return a small dict snapshot (handy when embedding into responses)."""
        return {
            "id": self.id,
            "bank_name": self.bank_name,
            "bank_account_number": self.bank_account_number,
            "ifsc_code": self.ifsc_code,
            "upi_id": self.upi_id,
            "qr_code": self.qr_code.url if self.qr_code else None,
        }

class WithdrawalRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
    )

    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, limit_choices_to={'role': 'user'})
    franchise = models.ForeignKey(Franchise, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Link to the franchise account
    franchise_account = models.ForeignKey('FranchiseAccount', on_delete=models.SET_NULL, null=True, blank=True)
    
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    # Optional: temporary user details (if you still want them)
    bank_account = models.CharField(max_length=100, null=True, blank=True)
    ifsc_code = models.CharField(max_length=20, null=True, blank=True)
    upi_id = models.CharField(max_length=100, null=True, blank=True)
    qr_code = models.ImageField(upload_to="user_qr/", null=True, blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def mark_completed(self):
        """Clear sensitive user details once completed"""
        self.bank_account = None
        self.ifsc_code = None
        self.upi_id = None
        self.qr_code = None
        self.status = "completed"
        self.completed_at = timezone.now()
        self.save()


class TransactionHistory(models.Model):
    TRANSACTION_TYPES = (
        ('deposit', 'Deposit'),
        ('withdraw', 'Withdraw'),
    )
    STATUS_CHOICES = (
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )

    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    franchise = models.ForeignKey(Franchise, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
