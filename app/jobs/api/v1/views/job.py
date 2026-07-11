from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from rest_framework.viewsets import ModelViewSet

from jobs.models import Job
from jobs.api.v1.permissions import IsJobOwner
from jobs.api.v1.serializers import JobSerializer
from accounts.api.v1.permissions import IsEmployer

class JobViewSet(ModelViewSet):

    serializer_class = JobSerializer
    
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filterset_fields = [
        "job_type",
        "experience_level",
        "location",
        "is_active",
    ]
    search_fields = [
        "title",
        "description",
        "requirements",
        "company__name",
    ]
    ordering_fields = [
        "salary_min",
        "salary_max",
        "created_at",
        "expires_at",
    ]

    def get_queryset(self):

        queryset = Job.objects.filter(
            is_active=True
        )

        return queryset.select_related(
            "company"
        ).prefetch_related(
            "skills"
        )

    def get_permissions(self):

        if self.action in [
            "list",
            "retrieve",
        ]:
            permissions = [AllowAny]

        elif self.action == "create":
            permissions = [
                IsAuthenticated,
                IsEmployer,
            ]

        else:
            permissions = [
                IsAuthenticated,
                IsEmployer,
                IsJobOwner,
            ]

        return [permission() for permission in permissions]