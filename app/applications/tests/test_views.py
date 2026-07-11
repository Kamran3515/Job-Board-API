import pytest

from datetime import timedelta
from django.utils import timezone

from rest_framework.test import APIRequestFactory
from django.urls import reverse

from tests.factories.applications import ApplicationFactory
from tests.factories.accounts import JobSeekerFactory
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

    assert response.data["count"] == 5


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