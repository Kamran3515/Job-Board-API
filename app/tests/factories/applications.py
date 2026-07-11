import factory

from applications.models import Application
from tests.factories.jobs import JobFactory
from tests.factories.accounts import JobSeekerFactory


class ApplicationFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Application

    applicant = factory.SubFactory(JobSeekerFactory)

    job = factory.SubFactory(JobFactory)

    cover_letter = factory.Faker("paragraph")

    status = Application.Status.PENDING