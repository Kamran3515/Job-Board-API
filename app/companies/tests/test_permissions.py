import pytest

from model_bakery import baker

from companies.api.v1.permissions import IsCompanyOwner


@pytest.mark.django_db
def test_company_owner_permission(rf):

    permission = IsCompanyOwner()

    request = rf.get("/")

    user = baker.make("accounts.User")

    company = baker.make(
        "companies.Company",
        owner=user,
    )

    request.user = user

    assert permission.has_object_permission(
        request,
        None,
        company,
    )


@pytest.mark.django_db
def test_company_owner_permission_denied(rf):

    owner = baker.make("accounts.User")
    another_user = baker.make("accounts.User")

    company = baker.make(
        "companies.Company",
        owner=owner,
    )

    request = rf.get("/")
    request.user = another_user

    permission = IsCompanyOwner()

    assert permission.has_object_permission(
        request,
        None,
        company,
    ) is False