import pytest

from rest_framework.test import APIRequestFactory

from jobs.api.v1.permissions import IsJobOwner
from tests.factories.accounts import EmployerFactory
from tests.factories.jobs import JobFactory


@pytest.mark.django_db
def test_job_owner_permission():

    employer = EmployerFactory()

    job = JobFactory(
        company__owner=employer
    )

    request = APIRequestFactory().get("/")

    request.user = employer

    permission = IsJobOwner()

    assert permission.has_object_permission(
        request,
        None,
        job,
    )