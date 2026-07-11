from rest_framework.permissions import BasePermission



class IsJobOwner(BasePermission):
    """
    Allow only the owner of the company to modify the job.
    """

    def has_object_permission(self, request, view, obj):
        return obj.company.owner == request.user