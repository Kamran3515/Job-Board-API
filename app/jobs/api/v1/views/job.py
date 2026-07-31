from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.filters import (SearchFilter,OrderingFilter)
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import (AllowAny,IsAuthenticated)
from rest_framework.viewsets import ModelViewSet
from ..filters import JobFilter
from jobs.models import Job
from jobs.api.v1.permissions import IsJobOwner
from jobs.api.v1.serializers import JobSerializer
from accounts.api.v1.permissions import IsEmployer
from rest_framework.decorators import api_view

from companies.models import Company
from applications.models import Application
from applications.api.v1.serializers import ApplicationSerializer

@api_view(["GET"])
def home_stats(request):

    return Response({

        "jobs": Job.objects.filter(is_active=True).count(),

        "companies": Company.objects.count(),

        "applications": Application.objects.count(),

    })

class JobViewSet(ModelViewSet):

    serializer_class = JobSerializer
    
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filterset_class = JobFilter
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
    
    @action(
        detail=False,
        methods=["get"],
        permission_classes=[IsAuthenticated,IsEmployer],
    )
    def my(self, request):

        queryset = (
            Job.objects
            .filter(
                company__owner=request.user
            )
            .select_related("company")
            .prefetch_related("skills")
            .annotate(
                applications_count=Count("applications")
            )
        )
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)
    
    @action(
        detail=True,
        methods=["get"],
        permission_classes=[
            IsAuthenticated,
            IsEmployer,
            IsJobOwner,
        ],
    )
    def applicants(self, request, pk=None):

        job = self.get_object()

        queryset = (
            Application.objects
            .filter(job=job)
            .select_related(
                "applicant",
                "job",
                "job__company",
            )
        )

        serializer = ApplicationSerializer(queryset, many=True)

        return Response(serializer.data)
    