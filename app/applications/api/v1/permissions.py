from rest_framework.permissions import BasePermission


class IsApplicationOwner(BasePermission):

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):
        return obj.applicant == request.user