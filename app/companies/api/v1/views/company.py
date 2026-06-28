from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated

from companies.models import Company
from companies.api.v1.serializers import CompanySerializer
from companies.api.v1.permissions import IsCompanyOwner

from accounts.api.v1.permissions import IsEmployer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_permissions(self):

        if self.action in ["list", "retrieve"]:
            permission_classes = [IsAuthenticatedOrReadOnly]

        elif self.action == "create":
            permission_classes = [IsAuthenticated, IsEmployer]

        else:
            permission_classes = [
                IsAuthenticated,
                IsEmployer,
                IsCompanyOwner,
            ]

        return [permission() for permission in permission_classes]