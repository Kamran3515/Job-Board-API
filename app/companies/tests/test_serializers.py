import pytest

from rest_framework.test import APIRequestFactory

from companies.api.v1.serializers import CompanySerializer


@pytest.mark.django_db
def test_company_serializer(employer):

    factory = APIRequestFactory()

    request = factory.post("/companies/")
    request.user = employer

    serializer = CompanySerializer(
        data={
            "name": "OpenAI",
            "description": "AI Company",
            "website": "https://openai.com",
            "location": "USA",
        },
        context={"request": request},
    )

    assert serializer.is_valid()