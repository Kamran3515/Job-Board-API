from django.db import models
from django.utils import timezone

from companies.models import Company


class Skill(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        db_index=True,
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Job(models.Model):

    class JobType(models.TextChoices):
        FULL_TIME = "FULL_TIME", "Full Time"
        PART_TIME = "PART_TIME", "Part Time"
        REMOTE = "REMOTE", "Remote"
        INTERNSHIP = "INTERNSHIP", "Internship"

    class ExperienceLevel(models.TextChoices):
        JUNIOR = "JUNIOR", "Junior"
        MID = "MID", "Mid"
        SENIOR = "SENIOR", "Senior"

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs",
    )

    title = models.CharField(
        max_length=255,
        db_index=True,
    )

    description = models.TextField()

    requirements = models.TextField()

    location = models.CharField(
        max_length=255,
        db_index=True,
    )

    salary_min = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    salary_max = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    job_type = models.CharField(
        max_length=20,
        choices=JobType.choices,
        db_index=True,
    )

    experience_level = models.CharField(
        max_length=20,
        choices=ExperienceLevel.choices,
        db_index=True,
    )

    skills = models.ManyToManyField(
        Skill,
        related_name="jobs",
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
        db_index=True,
    )

    expires_at = models.DateField(
        db_index=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    @property
    def is_expired(self):
        return self.expires_at < timezone.now().date()

    def __str__(self):
        return self.title