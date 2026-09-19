from django.contrib import admin
from .models import Registration


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):

    list_display = (
        "matrimony_id",
        "full_name",
        "gender",
        "phone",
        "status",
        "created_at",
        "verified_by",
    )

    list_filter = (
        "status",
        "gender",
        "religion",
        "marital_status",
        "created_at",
    )

    search_fields = (
        "matrimony_id",
        "full_name",
        "phone",
        "city",
        "district",
        "email",
    )

    readonly_fields = (
        "matrimony_id",
        "created_at",
        "updated_at",
        "verified_at",
        "published_at",
    )

    fieldsets = (
        (
            "Registration Information",
            {
                "fields": (
                    "user",
                    "matrimony_id",
                    "status",
                )
            },
        ),

        (
            "Personal Details",
            {
                "fields": (
                    "full_name",
                    "gender",
                    "date_of_birth",
                    "religion",
                    "caste",
                    "marital_status",
                    "height",
                )
            },
        ),

        (
            "Location",
            {
                "fields": (
                    "address",
                    "city",
                    "district",
                    "state",
                )
            },
        ),

        (
            "Education & Career",
            {
                "fields": (
                    "education",
                    "occupation",
                    "company",
                    "income",
                )
            },
        ),

        (
            "Contact",
            {
                "fields": (
                    "phone",
                    "alternate_phone",
                )
            },
        ),

        (
            "About",
            {
                "fields": (
                    "about",
                )
            },
        ),

        (
            "Photos & Documents",
            {
                "fields": (
                    "profile_photo",
                    "identity_document",
                    "additional_document",
                )
            },
        ),

        (
            "Verification",
            {
                "fields": (
                    "verified_by",
                    "verified_at",
                    "correction_reason",
                    "rejection_reason",
                    "published_at",
                )
            },
        ),

        (
            "Dates",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )