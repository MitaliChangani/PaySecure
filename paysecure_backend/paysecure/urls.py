from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    
    # User Registration
    path("register/", RegisterView.as_view(), name="register"),

    # Franchise Profile (view/update their own details)
    path("franchise/profile/", FranchiseProfileView.as_view(), name="franchise-profile"),
     path("franchise/accounts/", FranchiseAccountListView.as_view(), name="franchise-accounts"),
    path("franchise/accounts/add/", FranchiseAccountCreateView.as_view(), name="franchise-add-account"),

    # User Withdrawal Request
    path("withdraw/", WithdrawalRequestCreateView.as_view(), name="withdraw"),

    # Admin assigns withdrawal to franchise
    path("withdraw/<int:withdrawal_id>/assign/<int:franchise_id>/", AssignFranchiseView.as_view(), name="assign-franchise"),

    # Franchise marks withdrawal as paid
    path("withdraw/<int:withdrawal_id>/mark-paid/", MarkPaidView.as_view(), name="mark-paid"),

    # Transaction History (user sees their own, admin sees all)
    path("transactions/", TransactionHistoryView.as_view(), name="transactions"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
