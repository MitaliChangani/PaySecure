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
    path("logout/", logout_view, name="logout"),
    # path('whoami/', whoami, name='whoami'),
    path("forgot-password/", views.forgot_password),
    path("reset-password/", views.reset_password),
]
