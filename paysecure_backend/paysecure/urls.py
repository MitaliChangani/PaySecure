from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
from .views import get_csrf_token
from . import views


urlpatterns = [
    # path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    
    # User Registration
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("csrf/", get_csrf_token, name="csrf"),
    path("api/me/", current_user, name="current_user"),

    path("bank-accounts/", views.BankAccountListCreateView.as_view(), name="bank-accounts"),
    path("bank-accounts/<int:pk>/", views.BankAccountDetailView.as_view(), name="bank-account-detail"),

    # Wallet
    path("wallets/", views.WalletListView.as_view(), name="wallets"),

    # Franchise Pay-In (Withdrawal Requests from user)
    path("franchise/payin/", FranchisePayInView.as_view(), name="franchise-payin"),

    # Franchise Pay-Out (Deposit Requests from user)
    path("franchise/payout/", FranchisePayOutView.as_view(), name="franchise-payout"),

    # path("franchise/withdrawals/<int:pk>/accept/", views.accept_withdrawal, name="accept-withdrawal"),
    path("franchise/withdrawals/<int:pk>/complete/", views.complete_withdrawal, name="complete-withdrawal"),
    path('admin/withdrawals/<int:pk>/assign/', admin_assign_withdrawal, name='admin-assign-withdrawal'),
    path("franchise/withdrawals/", FranchiseWithdrawalListView.as_view(), name="franchise-withdrawal-list"),

    path('franchise/withdrawals/<int:pk>/accept/', accept_assigned_withdrawal, name='accept-assigned-withdrawal'),
    path('franchise/withdrawals/<int:pk>/complete/', complete_withdrawal, name='complete-withdrawal'),

    # Transactions
    path("franchise/transactions/", views.TransactionListView.as_view(), name="franchise-transactions"),
    
    path("deposit-requests/", DepositRequestCreateView.as_view(), name="deposit-request-create"),
    path("withdrawal-requests/", WithdrawalRequestCreateView.as_view(), name="withdrawal-request-create"),
   
    path("deposits/<int:pk>/user-utr/", UserDepositUTRUpdateView.as_view(), name="user-deposit-utr"),
    path("deposits/<int:pk>/franchise-utr/", FranchiseDepositUTRUpdateView.as_view(), name="franchise-deposit-utr"),

    # Withdrawal UTR match flow
    path("withdrawals/<int:pk>/user-utr/", UserWithdrawalUTRUpdateView.as_view(), name="user-withdrawal-utr"),
    path("withdrawals/<int:pk>/franchise-utr/", FranchiseWithdrawalUTRUpdateView.as_view(), name="franchise-withdrawal-utr"),
   
    path("logout/", logout_view, name="logout"),
    # path('whoami/', whoami, name='whoami'),
    path("forgot-password/", views.forgot_password),
    path("reset-password/", views.reset_password),
]
