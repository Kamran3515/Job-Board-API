import pytest

from datetime import timedelta
from django.utils import timezone

from rest_framework.test import APIRequestFactory
from django.urls import reverse

from rest_framework import status

from tests.factories.companies import CompanyFactory
from tests.factories.applications import ApplicationFactory
from tests.factories.accounts import JobSeekerFactory,EmployerFactory
from tests.factories.jobs import JobFactory


@pytest.mark.django_db
def test_job_seeker_can_apply(
    api_client,
    job_seeker,
):

    job = JobFactory()

    api_client.force_authenticate(job_seeker)

    response = api_client.post(
        reverse("applications-list"),
        {
            "job": job.id,
            "cover_letter": "I am interested.",
        },
        format="json",
    )

    print(response.status_code)
    print(response.data)

    assert response.status_code == 201


@pytest.mark.django_db
def test_employer_cannot_apply(
    api_client,
    employer,
):

    job = JobFactory()

    api_client.force_authenticate(employer)

    response = api_client.post(
        reverse("applications-list"),
        {
            "job": job.id,
            "cover_letter": "Hello",
        },
        format="json",
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_duplicate_application(
    api_client,
    job_seeker,
):

    job = JobFactory()

    ApplicationFactory(
        applicant=job_seeker,
        job=job,
    )

    api_client.force_authenticate(job_seeker)

    response = api_client.post(
        reverse("applications-list"),
        {
            "job": job.id,
            "cover_letter": "Again",
        },
        format="json",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_expired_job(
    api_client,
    job_seeker,
):

    job = JobFactory(
        expires_at=timezone.now().date() - timedelta(days=1)
    )

    api_client.force_authenticate(job_seeker)

    response = api_client.post(
        reverse("applications-list"),
        {
            "job": job.id,
            "cover_letter": "Hello",
        },
        format="json",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_inactive_job(
    api_client,
    job_seeker,
):

    job = JobFactory(
        is_active=False
    )

    api_client.force_authenticate(job_seeker)

    response = api_client.post(
        reverse("applications-list"),
        {
            "job": job.id,
            "cover_letter": "Hello",
        },
        format="json",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_only_my_applications(
    api_client,
    job_seeker,
):

    ApplicationFactory.create_batch(
        5,
        applicant=job_seeker,
    )

    ApplicationFactory.create_batch(3)

    api_client.force_authenticate(job_seeker)

    response = api_client.get(
        reverse("applications-list")
    )

    assert response.status_code == 200

    assert len(response.data) == 5


@pytest.mark.django_db
def test_application_detail(
    api_client,
):

    application = ApplicationFactory()

    api_client.force_authenticate(
        application.applicant
    )

    response = api_client.get(
        reverse(
            "applications-detail",
            args=[application.id],
        )
    )

    assert response.status_code == 200


@pytest.mark.django_db
def test_delete_application(
    api_client,
):

    application = ApplicationFactory()

    api_client.force_authenticate(
        application.applicant
    )

    response = api_client.delete(
        reverse(
            "applications-detail",
            args=[application.id],
        )
    )

    assert response.status_code == 204

@pytest.mark.django_db
def test_job_seeker_can_get_my_applications(
    client_factory,
):

    seeker = JobSeekerFactory()

    company = CompanyFactory()

    job = JobFactory(
        company=company,
    )

    application = ApplicationFactory(
        applicant=seeker,
        job=job,
    )

    other_user = JobSeekerFactory()

    ApplicationFactory(
        applicant=other_user,
        job=job,
    )

    client = client_factory(seeker)

    response = client.get(
        "/applications/api/v1/my-applications/"
    )

    assert response.status_code == status.HTTP_200_OK

    assert len(response.data) == 1

    assert (
        response.data[0]["id"]
        == application.id
    )

    assert (
        response.data[0]["applicant"]
        == seeker.id
    )

@pytest.mark.django_db
def test_employer_cannot_get_my_applications(
    client_factory,
):

    employer = EmployerFactory()

    client = client_factory(
        employer,
    )

    response = client.get(
        "/applications/api/v1/my-applications/"
    )

    assert response.status_code == (
        status.HTTP_403_FORBIDDEN
    )

    assert (
        response.data["detail"]
        ==
        "Only job seekers can access this endpoint."
    )

@pytest.mark.django_db
def test_anonymous_user_cannot_get_my_applications(
    api_client,
):

    response = api_client.get(
        "/applications/api/v1/my-applications/"
    )

    assert response.status_code == (
        status.HTTP_401_UNAUTHORIZED
    )

@pytest.mark.django_db
def test_employer_can_get_job_applicants(
    client_factory,
):

    employer = EmployerFactory()

    company = CompanyFactory(
        owner=employer,
    )

    job = JobFactory(
        company=company,
    )

    ApplicationFactory.create_batch(
        3,
        job=job,
    )

    client = client_factory(
        employer,
    )

    response = client.get(
        f"/applications/api/v1/jobs/{job.id}/applicants/"
    )

    assert response.status_code == status.HTTP_200_OK

    assert len(response.data) == 3

@pytest.mark.django_db
def test_other_employer_cannot_get_job_applicants(
    client_factory,
):

    owner = EmployerFactory()

    other = EmployerFactory()

    company = CompanyFactory(
        owner=owner,
    )

    job = JobFactory(
        company=company,
    )

    ApplicationFactory(job=job)

    client = client_factory(
        other,
    )

    response = client.get(
        f"/applications/api/v1/jobs/{job.id}/applicants/"
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN

    assert (
        response.data["detail"]
        == "You do not own this job."
    )

@pytest.mark.django_db
def test_job_seeker_cannot_get_job_applicants(
    client_factory,
):

    employer = EmployerFactory()

    company = CompanyFactory(
        owner=employer,
    )

    job = JobFactory(
        company=company,
    )

    seeker = JobSeekerFactory()

    client = client_factory(
        seeker,
    )

    response = client.get(
        f"/applications/api/v1/jobs/{job.id}/applicants/"
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN

    assert (
        response.data["detail"]
        == "Only employers can access this endpoint."
    )