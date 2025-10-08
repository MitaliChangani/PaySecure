from rest_framework.permissions import BasePermission

# -------------------- ROLE PERMISSIONS --------------------

class IsAdmin(BasePermission):
    """
    Allows access only to admin users.
    """
    message = "You must be an admin to access this resource."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"


class IsFranchise(BasePermission):
    """
    Allows access only to franchise users.
    """
    message = "You must be a franchise user to access this resource."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "franchise"


class IsNormalUser(BasePermission):
    """
    Allows access only to normal users.
    """
    message = "You must be a normal user to access this resource."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "user"


# -------------------- COMBINED PERMISSIONS --------------------

class IsAdminOrFranchise(BasePermission):
    """
    Allows access to admin or franchise users.
    """
    message = "You must be an admin or a franchise user to access this resource."

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ["admin", "franchise"]

