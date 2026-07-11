import pytest

from datetime import timedelta

from django.utils import timezone
from rest_framework.test import APIRequestFactory

from jobs.api.v1.serializers import JobSerializer
from tests.factories.companies import CompanyFactory
from tests.factories.accounts import EmployerFactory


@pytest.mark.django_db
def test_job_serializer():

    employer = EmployerFactory()

    company = CompanyFactory(
        owner=employer
    )

    request = APIRequestFactory().post("/")

    request.user = employer

    serializer = JobSerializer(
        data={
            "company": company.id,
            "title": "Backend",
            "description": "desc",
            "requirements": "Python",
            "location": "Remote",
            "salary_min": 1000,
            "salary_max": 2000,
            "job_type": "FULL_TIME",
            "experience_level": "MID",
            "expires_at":
                timezone.now().date()
                + timedelta(days=30),
        },
        context={
            "request": request
        },
    )

    assert serializer.is_valid()

@pytest.mark.django_db
def test_invalid_salary_range():

    employer = EmployerFactory()

    company = CompanyFactory(
        owner=employer
    )

    request = APIRequestFactory().post("/")

    request.user = employer

    serializer = JobSerializer(
        data={
            "company": company.id,
            "title": "Backend",
            "description": "desc",
            "requirements": "Python",
            "location": "Remote",
            "salary_min": 5000,
            "salary_max": 1000,
            "job_type": "FULL_TIME",
            "experience_level": "MID",
            "expires_at":
                timezone.now().date()
                + timedelta(days=30),
        },
        context={
            "request": request
        },
    )

    assert serializer.is_valid() is False

    assert "salary" in serializer.errors