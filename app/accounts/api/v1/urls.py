from django.urls import path

from .views.auth import RegisterView, MeView
from .views.profile import ProfileView
from .views.dashboard import DashboardView
from .views.password import ForgotPasswordView, ResetPasswordView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("password/forgot/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("password/reset/", ResetPasswordView.as_view(), name="reset-password"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("profile/user/<int:pk>/", ProfileView.as_view(), name="profiless"),
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("me/", MeView.as_view(), name="me"),
]