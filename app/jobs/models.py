from django.db import models
from companies.models import Company


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    

class Job(models.Model):

    class JobType(models.TextChoices):
        FULL_TIME = "FULL_TIME", "Full Time"
        PART_TIME = "PART_TIME", "Part Time"
        REMOTE = "REMOTE", "Remote"
        INTERNSHIP = "INTERNSHIP", "Internship"

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    requirements = models.TextField()

    job_type = models.CharField(
        max_length=20,
        choices=JobType.choices
    )

    salary = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    skills = models.ManyToManyField(
        Skill,
        related_name="jobs",
        blank=True
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title