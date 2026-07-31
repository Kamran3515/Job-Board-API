import factory

from datetime import timedelta

from django.utils import timezone

from jobs.models import Job
from .companies import CompanyFactory
from companies.models import Company
from jobs.models import Skill


class SkillFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Skill

    name = factory.Sequence(
        lambda n: f"Skill {n}"
    )

class JobFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = Job

    company = factory.SubFactory(
        CompanyFactory
    )

    title = factory.Sequence(
        lambda n: f"Backend Developer {n}"
    )

    description = "Job Description"

    requirements = "Python, Django"

    location = "Remote"

    salary_min = 3000

    salary_max = 5000

    job_type = Job.JobType.FULL_TIME

    work_mode = Job.WorkMode.ONSITE

    experience_level = Job.ExperienceLevel.MID

    expires_at = factory.LazyFunction(
        lambda: timezone.now().date() + timedelta(days=30)
    )

    @factory.post_generation
    def skills(self, create, extracted, **kwargs):

        if not create:
            return

        if extracted:
            self.skills.set(extracted)