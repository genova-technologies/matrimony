from django.db import models
from django.conf import settings


class Notification(models.Model):

    class NotificationType(models.TextChoices):
        PROFILE_UPDATED = "PROFILE_UPDATED", "Profile Updated"
        PHOTO_UPDATED = "PHOTO_UPDATED", "Photo Updated"
        PROFILE_SUBMITTED = "PROFILE_SUBMITTED", "Profile Submitted"
        CORRECTION_REQUIRED = "CORRECTION_REQUIRED", "Correction Required"
        PROFILE_APPROVED = "PROFILE_APPROVED", "Profile Approved"
        PROFILE_REJECTED = "PROFILE_REJECTED", "Profile Rejected"

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sent_notifications"
    )

    registration = models.ForeignKey(
        "registrations.Registration",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="notifications"
    )

    profile_change = models.ForeignKey(
        "adminpanel.ProfileChange",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="notifications"
    )

    notification_type = models.CharField(
        max_length=40,
        choices=NotificationType.choices
    )

    title = models.CharField(
        max_length=255
    )

    message = models.TextField()

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Notification to {self.recipient.email}: {self.title} ({'Read' if self.is_read else 'Unread'})"
