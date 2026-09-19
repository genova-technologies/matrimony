from django.urls import path
from .views import LoginView, ChangePasswordView, UpdateAccountView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("update-account/", UpdateAccountView.as_view(), name="update-account"),
]