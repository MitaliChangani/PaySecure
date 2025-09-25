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





# class Franchise(models.Model):
#     user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, limit_choices_to={'role': 'franchise'})
#     created_at = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return f"Franchise: {self.user.username}"


# class FranchiseAccount(models.Model):
#     franchise = models.ForeignKey(Franchise, on_delete=models.CASCADE, related_name='accounts')
#     bank_name = models.CharField(max_length=100)
#     bank_account_number = models.CharField(max_length=50)
#     ifsc_code = models.CharField(max_length=20)
#     upi_id = models.CharField(max_length=100, blank=True, null=True)
#     qr_code = models.ImageField(upload_to="franchise_qr/", blank=True, null=True)
#     created_at = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return f"{self.bank_name} - {self.bank_account_number}"
    
#     def as_dict(self):
#         """Return a small dict snapshot (handy when embedding into responses)."""
#         return {
#             "id": self.id,
#             "bank_name": self.bank_name,
#             "bank_account_number": self.bank_account_number,
#             "ifsc_code": self.ifsc_code,
#             "upi_id": self.upi_id,
#             "qr_code": self.qr_code.url if self.qr_code else None,
#         }

# class WithdrawalRequest(models.Model):
#     STATUS_CHOICES = (
#         ('pending', 'Pending'),
#         ('processing', 'Processing'),
#         ('completed', 'Completed'),
#     )

#     user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, limit_choices_to={'role': 'user'})
#     franchise = models.ForeignKey(Franchise, on_delete=models.SET_NULL, null=True, blank=True)
    
#     # Link to the franchise account
#     franchise_account = models.ForeignKey('FranchiseAccount', on_delete=models.SET_NULL, null=True, blank=True)
    
#     amount = models.DecimalField(max_digits=12, decimal_places=2)

#     # Optional: temporary user details (if you still want them)
#     bank_account = models.CharField(max_length=100, null=True, blank=True)
#     ifsc_code = models.CharField(max_length=20, null=True, blank=True)
#     upi_id = models.CharField(max_length=100, null=True, blank=True)
#     qr_code = models.ImageField(upload_to="user_qr/", null=True, blank=True)

#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
#     created_at = models.DateTimeField(auto_now_add=True)
#     completed_at = models.DateTimeField(null=True, blank=True)

#     def mark_completed(self):
#         """Clear sensitive user details once completed"""
#         self.bank_account = None
#         self.ifsc_code = None
#         self.upi_id = None
#         self.qr_code = None
#         self.status = "completed"
#         self.completed_at = timezone.now()
#         self.save()


# class TransactionHistory(models.Model):
#     TRANSACTION_TYPES = (
#         ('deposit', 'Deposit'),
#         ('withdraw', 'Withdraw'),
#     )
#     STATUS_CHOICES = (
#         ('processing', 'Processing'),
#         ('completed', 'Completed'),
#         ('failed', 'Failed'),
#     )

#     user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
#     franchise = models.ForeignKey(Franchise, on_delete=models.SET_NULL, null=True)
#     amount = models.DecimalField(max_digits=12, decimal_places=2)
#     transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES)
#     created_at = models.DateTimeField(auto_now_add=True)
