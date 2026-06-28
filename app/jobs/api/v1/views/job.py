from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from accounts.api.v1.permissions import IsEmployer

from companies.models import Company

from jobs.models import Job

from jobs.api.v1.serializers import JobSerializer
from jobs.api.v1.permissions import IsJobOwner


class JobViewSet(viewsets.ModelViewSet):

    serializer_class = JobSerializer

    permission_classes = [
        IsAuthenticated,
        IsEmployer,
    ]

    def perform_create(self, serializer):

        try:
            company = Company.objects.get(owner=self.request.user)

        except Company.DoesNotExist:
            raise ValidationError(
                {
                    "detail": "Create a company first."
                }
            )

        serializer.save(company=company)


