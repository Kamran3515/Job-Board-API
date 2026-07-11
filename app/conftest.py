import pytest

from rest_framework.test import APIClient

from tests.factories.applications import *
from tests.factories.accounts import *
from tests.factories.companies import *
from tests.factories.jobs import *


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def employer():
    return EmployerFactory()


@pytest.fixture
def job_seeker():
    return JobSeekerFactory()


@pytest.fixture
def company(employer):
    return CompanyFactory(owner=employer)


@pytest.fixture
def skill():
    return SkillFactory()


@pytest.fixture
def job(company):
    return JobFactory(company=company)


@pytest.fixture
def auth_client(api_client, employer):

    api_client.force_authenticate(
        employer
    )

    return api_client