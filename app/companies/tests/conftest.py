import pytest

from rest_framework.test import APIClient
from model_bakery import baker


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def employer():
    return baker.make(
        "accounts.User",
        role="EMPLOYER",
    )

@pytest.fixture
def job_seeker():
    return baker.make(
        "accounts.User",
        role="JOB_SEEKER",
    )


@pytest.fixture
def company(employer):

    return baker.make(
        "companies.Company",
        owner=employer,
    )