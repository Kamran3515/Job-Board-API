import pytest

from rest_framework.test import APIRequestFactory

from applications.api.v1.serializers import ApplicationSerializer
from tests.factories.applications import ApplicationFactory
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