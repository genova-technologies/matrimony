from rest_framework import serializers
from django.utils import timezone
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):

    sender_name = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    matrimony_id = serializers.SerializerMethodField()
    registration_id = serializers.SerializerMethodField()
    profile_change_id = serializers.SerializerMethodField()
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            "id",
            "recipient",
            "sender",
            "sender_name",
            "client_name",
            "matrimony_id",
            "registration_id",
            "profile_change_id",
            "notification_type",
            "title",
            "message",
            "is_read",
            "created_at",
            "time_ago",
        ]

    def get_sender_name(self, obj):
        if obj.sender:
            return obj.sender.full_name or obj.sender.username or obj.sender.email
        return "System"

    def get_client_name(self, obj):
        if obj.registration:
            return obj.registration.full_name
        if obj.sender:
            return obj.sender.full_name
        return None

    def get_matrimony_id(self, obj):
        if obj.registration:
            return obj.registration.matrimony_id
        return None

    def get_registration_id(self, obj):
        return obj.registration_id

    def get_profile_change_id(self, obj):
        return obj.profile_change_id

    def get_time_ago(self, obj):
        if not obj.created_at:
            return ""
        now = timezone.now()
        diff = now - obj.created_at

        seconds = diff.total_seconds()
        if seconds < 60:
            return "Just now"
        minutes = int(seconds // 60)
        if minutes < 60:
            return f"{minutes} min{'s' if minutes > 1 else ''} ago"
        hours = int(minutes // 60)
        if hours < 24:
            return f"{hours} hour{'s' if hours > 1 else ''} ago"
        days = int(hours // 24)
        if days < 30:
            return f"{days} day{'s' if days > 1 else ''} ago"
        return obj.created_at.strftime("%b %d, %Y")
