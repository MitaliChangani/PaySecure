from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"


class IsFranchise(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "franchise"


class IsNormalUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "user"
