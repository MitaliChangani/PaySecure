from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
from .views import get_csrf_token
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'franchise/banks', FranchiseBankViewSet, basename='franchise-banks')
router.register(r'payin', PayInRequestViewSet, basename='payin')
router.register(r'payout', PayOutRequestViewSet, basename='payout')

urlpatterns = [    
    # User Registration
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("csrf/", get_csrf_token, name="csrf"),
    path("api/me/", current_user, name="current_user"),

   
    path("logout/", logout_view, name="logout"),
    path("forgot-password/", views.forgot_password),
    path("reset-password/", views.reset_password),
    path('', include(router.urls)),
]
