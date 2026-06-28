from rest_framework.permissions import BasePermission


class IsJobOwner(BasePermission):

    def has_object_permission(self, request, view, obj):

        return obj.company.owner == request.user