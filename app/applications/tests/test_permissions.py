import pytest

from tests.factories.applications import ApplicationFactory
from applications.api.v1.permissions import IsApplicationOwner


@pytest.mark.django_db
def test_application_owner_permission(rf):

    permission = IsApplicationOwner()

    application = ApplicationFactory()

    request = rf.get("/")
    request.user = application.applicant

    assert permission.has_object_permission(
        request,
        None,
        application,
    )