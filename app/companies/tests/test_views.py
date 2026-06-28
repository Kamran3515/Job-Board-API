import pytest

from rest_framework.test import APIClient

from model_bakery import baker
from django.urls import reverse


@pytest.mark.django_db
def test_company_list(api_client):

    baker.make(
        "companies.Company",
        _quantity=5,
    )

    url = reverse("companies-list")

    response = api_client.get(url)

    assert response.status_code == 200

    assert len(response.data) == 5

@pytest.mark.django_db
def test_employer_can_have_only_one_company(
    api_client,
    employer,
    company,
):

    api_client.force_authenticate(user=employer)

    response = api_client.post(
        reverse("companies-list"),
        {
            "name": "Second Company",
            "description": "Desc",
            "website": "https://example.com",
            "location": "USA",
        },
        format="json",
    )

    assert response.status_code == 400