import pytest

from model_bakery import baker

from companies.models import Company


@pytest.mark.django_db
def test_company_str():

    company = baker.make(
        Company,
        name="OpenAI"
    )

    assert str(company) == "OpenAI"