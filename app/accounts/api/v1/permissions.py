from rest_framework.permissions import BasePermission

    
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