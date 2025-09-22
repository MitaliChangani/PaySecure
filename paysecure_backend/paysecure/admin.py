from django.contrib import admin
from .models import CustomUser, Franchise, WithdrawalRequest, TransactionHistory

# ------------------- CustomUser -------------------
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'role', 'email', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')


# ------------------- Franchise -------------------
from django.contrib import admin
from .models import CustomUser, Franchise, FranchiseAccount, WithdrawalRequest, TransactionHistory

# ------------------- Franchise Admin -------------------
class FranchiseAccountInline(admin.TabularInline):
    model = FranchiseAccount
    extra = 1  # show one extra empty row to add new account

@admin.register(Franchise)
class FranchiseAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_username', 'created_at')
    inlines = [FranchiseAccountInline]

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = 'Franchise Name'


# ------------------- WithdrawalRequest -------------------
@admin.register(WithdrawalRequest)
class WithdrawalRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'franchise', 'amount', 'status', 'created_at', 'completed_at')
    list_filter = ('status', 'created_at')


# ------------------- TransactionHistory -------------------
@admin.register(TransactionHistory)
class TransactionHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'franchise', 'amount', 'transaction_type', 'status', 'created_at')
    list_filter = ('transaction_type', 'status', 'created_at')
