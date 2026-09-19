from rest_framework import serializers
from .models import ProfileVerification
from registrations.models import Registration


class ProfileVerificationSerializer(serializers.ModelSerializer):
    registration_id = serializers.IntegerField(
        source="registration.id",
        read_only=True
    )

    matrimony_id = serializers.CharField(
        source="registration.matrimony_id",
        read_only=True
    )

    client_name = serializers.CharField(
        source="registration.full_name",
        read_only=True
    )

    client_email = serializers.EmailField(
        source="registration.user.email",
        read_only=True
    )

    class Meta:
        model = ProfileVerification
        fields = [
            "id",
            "registration_id",
            "matrimony_id",
            "client_name",
            "client_email",
            "status",
            "correction_message",
            "rejection_reason",
            "admin_notes",
            "assigned_admin",
            "submitted_at",
            "reviewed_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "registration_id",
            "matrimony_id",
            "client_name",
            "client_email",
            "submitted_at",
            "reviewed_at",
            "updated_at",
        ]


class RegistrationCheckingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Registration
        fields = "__all__"
        read_only_fields = [
            "id",
            "matrimony_id",
            "status",
            "verified_by",
            "verified_at",
            "published_at",
            "created_at",
            "updated_at",
        ]