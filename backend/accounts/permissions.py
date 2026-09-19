from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """Allow access only to Admin users."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "ADMIN"
        )


class IsClient(BasePermission):
    """Allow access only to Client users."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "CLIENT"
        )


class IsBroker(BasePermission):
    """Allow access only to Broker users."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "BROKER"
        )


class IsAdminOrBroker(BasePermission):
    """Allow access to Admin or Broker users."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role in ["ADMIN", "BROKER"]
        )