from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, UserProfile, PasswordResetOTP, FranchiseBank, PayInRequest, PayOutRequest


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



@admin.register(PasswordResetOTP)
class PasswordResetOTPAdmin(admin.ModelAdmin):
    list_display = ('user', 'otp', 'created_at', 'expires_at', 'is_verified')
    list_filter = ('is_verified',)
    search_fields = ('user__username', 'otp')


@admin.register(FranchiseBank)
class FranchiseBankAdmin(admin.ModelAdmin):
    list_display = (
        'franchise',
        'bank_name',
        'account_name',
        'account_number',
        'ifsc',
        'upi_id',
        'min_limit',
        'max_limit',
        'direct_payment_link',
        'is_active',
        'created_at',
    )
    search_fields = ('franchise__username', 'bank_name', 'account_number', 'upi_id', 'is_active')
    list_filter = ('bank_name',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(PayInRequest)
class PayInRequestAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'customer_id',
        'amount',
        'assigned_franchise',
        'status',
        'razorpay_link',
        'created_at',
    )
    list_filter = ('status', 'created_at')
    search_fields = ('customer_id', 'user__username', 'assigned_franchise__username')
    readonly_fields = ('created_at',)


@admin.register(PayOutRequest)
class PayOutRequestAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'customer_id',
        'amount',
        'assigned_franchise',
        'status',
        'created_at',
    )
    list_filter = ('status', 'created_at')
    search_fields = ('customer_id', 'user__username', 'assigned_franchise__username')
    readonly_fields = ('created_at',)

admin.site.register(CustomUser, CustomUserAdmin)
