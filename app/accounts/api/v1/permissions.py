from rest_framework.permissions import BasePermission
from accounts.models import User
    
class IsEmployer(BasePermission):
    """
    Allow access only to employers.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "EMPLOYER"
        )


class IsJobSeeker(BasePermission):
    """
    Allow access only to jobseekers.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "JOB_SEEKER"
        )
    

class IsAdmin(BasePermission):
    """
    Allow access only to Admin.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == User.Role.ADMIN
        )