from rest_framework.permissions import (
    IsAuthenticated,
)

from rest_framework.viewsets import ModelViewSet

from applications.models import Application
from applications.api.v1.serializers import (
    ApplicationSerializer,
)
from applications.api.v1.permissions import (
    IsApplicationOwner,
)
from accounts.api.v1.permissions import (
    IsJobSeeker,
)


class ApplicationViewSet(ModelViewSet):

    serializer_class = ApplicationSerializer

    def get_queryset(self):

        return Application.objects.filter(
            applicant=self.request.user,
        ).select_related(
            "job",
            "job__company",
        )

    def get_permissions(self):

        if self.action == "create":
            permissions = [
                IsAuthenticated,
                IsJobSeeker,
            ]
        else:
            permissions = [
                IsAuthenticated,
                IsApplicationOwner,
            ]

        return [permission() for permission in permissions]