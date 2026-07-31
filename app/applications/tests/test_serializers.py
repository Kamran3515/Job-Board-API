import pytest

from rest_framework.test import APIRequestFactory

from applications.api.v1.serializers import ApplicationSerializer
from tests.factories.applications import ApplicationFactory
from tests.factories.companies import CompanyFactory
from tests.factories.accounts import JobSeekerFactory
from tests.factories.jobs import JobFactory


@pytest.mark.django_db
def test_application_serializer():

    seeker = JobSeekerFactory()

    job = JobFactory()

    request = APIRequestFactory().post("/")
    request.user = seeker

    serializer = ApplicationSerializer(
        data={
            "job": job.id,
            "cover_letter": "I am interested.",
        },
        context={
            "request": request,
        },
    )

    assert serializer.is_valid()


@pytest.mark.django_db
def test_duplicate_application_not_allowed():

    seeker = JobSeekerFactory()

    job = JobFactory()

    ApplicationFactory(
        applicant=seeker,
        job=job,
    )

    request = APIRequestFactory().post("/")
    request.user = seeker

    serializer = ApplicationSerializer(
        data={
            "job": job.id,
            "cover_letter": "Hello",
        },
        context={
            "request": request,
        },
    )

    assert serializer.is_valid() is False


@pytest.mark.django_db
def test_application_serializer_contains_extra_fields():
    company = CompanyFactory()
    seeker = JobSeekerFactory()

    job = JobFactory(
        company=company,
    )

    application = ApplicationFactory(
        job=job,
        applicant=seeker,
    )

    serializer = ApplicationSerializer(application)

    assert serializer.data["job_title"] == job.title

    assert serializer.data["company_name"] == company.name

    assert serializer.data["applicant_name"] == seeker.username