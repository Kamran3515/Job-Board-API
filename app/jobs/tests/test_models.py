import pytest

from tests.factories.jobs import *


@pytest.mark.django_db
def test_job_str():

    job = JobFactory(
        title="Backend Django Developer"
    )

    assert str(job) == "Backend Django Developer"

@pytest.mark.django_db
def test_skill_str():

    skill = SkillFactory(
        name="Python"
    )

    assert str(skill) == "Python"