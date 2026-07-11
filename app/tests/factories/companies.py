import factory

from companies.models import Company
from .accounts import EmployerFactory


class CompanyFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Company

    owner = factory.SubFactory(
        EmployerFactory
    )

    name = factory.Sequence(
        lambda n: f"Company {n}"
    )

    description = "Description"

    website = "https://example.com"

    location = "USA"