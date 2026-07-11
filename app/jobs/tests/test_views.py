import pytest

from django.urls import reverse

from tests.factories.accounts import EmployerFactory
from tests.factories.jobs import JobFactory
from tests.factories.companies import CompanyFactory


@pytest.mark.django_db
def test_job_list(api_client):

    JobFactory.create_batch(5)

    response = api_client.get(
        reverse("jobs-list")
    )

    assert response.status_code == 200

    assert response.data["count"] == 5

@pytest.mark.django_db
def test_create_job(
    auth_client,
    company,
):

    response = auth_client.post(
        reverse("jobs-list"),
        {
            "company": company.id,
            "title": "Backend",
            "description": "desc",
            "requirements": "Python",
            "location": "Remote",
            "salary_min": 1000,
            "salary_max": 2000,
            "job_type": "FULL_TIME",
            "experience_level": "MID",
            "expires_at": "2027-01-01",
        },
        format="json",
    )

    assert response.status_code == 201


@pytest.mark.django_db
def test_job_seeker_cannot_create_job(
    api_client,
    job_seeker,
    company,
):

    api_client.force_authenticate(job_seeker)

    response = api_client.post(
        reverse("jobs-list"),
        {
            "company": company.id,
            "title": "Backend",
            "description": "Backend API",
            "requirements": "Python",
            "location": "Remote",
            "salary_min": 1000,
            "salary_max": 2000,
            "job_type": "FULL_TIME",
            "experience_level": "MID",
            "expires_at": "2027-01-01",
        },
        format="json",
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_employer_cannot_create_job_for_other_company(
    auth_client,
):

    other_company = CompanyFactory()

    response = auth_client.post(
        reverse("jobs-list"),
        {
            "company": other_company.id,
            "title": "Backend",
            "description": "Backend API",
            "requirements": "Python",
            "location": "Remote",
            "salary_min": 1000,
            "salary_max": 2000,
            "job_type": "FULL_TIME",
            "experience_level": "MID",
            "expires_at": "2027-01-01",
        },
        format="json",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_job_detail(api_client):

    job = JobFactory()

    response = api_client.get(
        reverse(
            "jobs-detail",
            args=[job.id],
        )
    )

    assert response.status_code == 200

    assert response.data["title"] == job.title


@pytest.mark.django_db
def test_owner_can_update_job(
    auth_client,
    job,
):

    response = auth_client.patch(
        reverse(
            "jobs-detail",
            args=[job.id],
        ),
        {
            "title": "Senior Backend Developer"
        },
        format="json",
    )

    assert response.status_code == 200

    assert response.data["title"] == "Senior Backend Developer"


@pytest.mark.django_db
def test_other_employer_cannot_update_job(
    api_client,
    job,
):

    employer = EmployerFactory()

    api_client.force_authenticate(
        employer
    )

    response = api_client.patch(
        reverse(
            "jobs-detail",
            args=[job.id],
        ),
        {
            "title": "Hack"
        },
        format="json",
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_owner_can_delete_job(
    auth_client,
    job,
):

    response = auth_client.delete(
        reverse(
            "jobs-detail",
            args=[job.id],
        )
    )

    assert response.status_code == 204


@pytest.mark.django_db
def test_filter_jobs_by_location(api_client):

    JobFactory(location="Tehran")

    JobFactory(location="London")

    response = api_client.get(
        reverse("jobs-list"),
        {
            "location": "Tehran",
        },
    )

    assert response.status_code == 200

    assert response.data["count"] == 1


@pytest.mark.django_db
def test_search_jobs(api_client):

    JobFactory(title="Django Developer",requirements="Python Django")

    JobFactory(title="React Developer",requirements="React TypeScript")

    response = api_client.get(
        reverse("jobs-list"),
        {
            "search": "django",
        },
    )

    assert response.status_code == 200

    assert response.data["count"] == 1


@pytest.mark.django_db
def test_order_jobs_by_salary(api_client):

    JobFactory(salary_min=1000)

    JobFactory(salary_min=5000)

    response = api_client.get(
        reverse("jobs-list"),
        {
            "ordering": "-salary_min",
        },
    )

    assert response.status_code == 200

    assert response.data["results"][0]["salary_min"] == 5000