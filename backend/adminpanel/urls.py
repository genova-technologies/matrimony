from django.urls import path

from .views import (
    AdminRegistrationListView,
    AdminRegistrationDetailView,
    AdminApproveRegistrationView,
    AdminCorrectionRegistrationView,
    AdminRejectRegistrationView,
    AdminPublishRegistrationView,
)


urlpatterns = [
    path(
        "registrations/",
        AdminRegistrationListView.as_view(),
        name="admin-registration-list",
    ),

    path(
        "registrations/<int:pk>/",
        AdminRegistrationDetailView.as_view(),
        name="admin-registration-detail",
    ),

    path(
        "registrations/<int:pk>/approve/",
        AdminApproveRegistrationView.as_view(),
        name="admin-registration-approve",
    ),

    path(
        "registrations/<int:pk>/correction/",
        AdminCorrectionRegistrationView.as_view(),
        name="admin-registration-correction",
    ),

    path(
        "registrations/<int:pk>/reject/",
        AdminRejectRegistrationView.as_view(),
        name="admin-registration-reject",
    ),

    path(
        "registrations/<int:pk>/publish/",
        AdminPublishRegistrationView.as_view(),
        name="admin-registration-publish",
    ),
]