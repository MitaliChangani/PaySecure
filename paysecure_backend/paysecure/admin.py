from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    CustomUser, UserProfile, Wallet, BankAccount, 
    DepositRequest, WithdrawalRequest, Transaction
)

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('id', 'username', 'email', 'role', 'is_active', 'is_staff')
    list_filter = ('role', 'is_active', 'is_staff')
    search_fields = ('username', 'email')
    ordering = ('id',)
    fieldsets = UserAdmin.fieldsets + (
        ('Role Info', {'fields': ('role',)}),
    )



class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'phone_number', 'address')
    search_fields = ('user__username', 'phone_number')


class WalletAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'bank_account', 'balance')
    search_fields = ('owner__username', 'bank_account__bank_name')
    list_filter = ('bank_account',)



class BankAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'franchise', 'bank_name', 'account_number', 'ifsc_code', 'upi_id', 'limit', 'is_active')
    search_fields = ('franchise__username', 'bank_name', 'account_number', 'ifsc_code', 'upi_id')
    list_filter = ('is_active', 'franchise')


class DepositRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'status', 'franchise_account', 'franchise_utr', 'user_utr', 'created_at')
    search_fields = ('user__username', 'franchise_account__bank_name', 'franchise_utr', 'user_utr')
    list_filter = ('status', 'created_at')



class WithdrawalRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'status', 'created_at', 'get_utr')

    def get_utr(self, obj):
        return obj.utr_number or "N/A"
    get_utr.short_description = "UTR Number"


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'franchise', 'transaction_type', 'amount', 'utr_number', 'order_id', 'transaction_id', 'status', 'created_at')
    search_fields = ('user__username', 'franchise__username', 'utr_number', 'order_id', 'transaction_id')
    list_filter = ('transaction_type', 'status', 'created_at')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Wallet, WalletAdmin)
admin.site.register(BankAccount, BankAccountAdmin)
admin.site.register(DepositRequest, DepositRequestAdmin)
admin.site.register(WithdrawalRequest, WithdrawalRequestAdmin)
admin.site.register(Transaction, TransactionAdmin)

# ------------------- Franchise -------------------
# from django.contrib import admin
# from .models import CustomUser, Franchise, FranchiseAccount, WithdrawalRequest, TransactionHistory

# ------------------- Franchise Admin -------------------
# class FranchiseAccountInline(admin.TabularInline):
#     model = FranchiseAccount
#     extra = 1  # show one extra empty row to add new account

# @admin.register(Franchise)
# class FranchiseAdmin(admin.ModelAdmin):
#     list_display = ('id', 'get_username', 'created_at')
#     inlines = [FranchiseAccountInline]

#     def get_username(self, obj):
#         return obj.user.username
#     get_username.short_description = 'Franchise Name'


# # ------------------- WithdrawalRequest -------------------
# @admin.register(WithdrawalRequest)
# class WithdrawalRequestAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'franchise', 'amount', 'status', 'created_at', 'completed_at')
#     list_filter = ('status', 'created_at')


# # ------------------- TransactionHistory -------------------
# @admin.register(TransactionHistory)
# class TransactionHistoryAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'franchise', 'amount', 'transaction_type', 'status', 'created_at')
#     list_filter = ('transaction_type', 'status', 'created_at')
