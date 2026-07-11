import factory

from accounts.models import User


class EmployerFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = User

    first_name = "Kamran"
    last_name = "Rezaei"

    username = factory.Sequence(
        lambda n: f"employer{n}"
    )

    email = factory.Sequence(
        lambda n: f"employer{n}@gmail.com"
    )

    role = "EMPLOYER"

    password = factory.PostGenerationMethodCall(
        "set_password",
        "12345678",
    )


class JobSeekerFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = User

    username = factory.Sequence(
        lambda n: f"jobseeker{n}"
    )

    email = factory.Sequence(
        lambda n: f"jobseeker{n}@gmail.com"
    )

    first_name = "Ali"

    last_name = "Ahmadi"

    role = "JOB_SEEKER"

    password = factory.PostGenerationMethodCall(
        "set_password",
        "12345678",
    )