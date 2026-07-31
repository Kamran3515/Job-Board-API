from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from jobs.models import Skill

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        EMPLOYER = "EMPLOYER", "Employer"
        JOB_SEEKER = "JOB_SEEKER", "Job Seeker"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.JOB_SEEKER,
    )

    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


class Profile(models.Model):

    user = models.OneToOneField(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="profile",
    )

    avatar = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True,
    )

    skills = models.ManyToManyField(
        Skill,
        blank=True,
        related_name="profiles",
    )

    first_name = models.CharField(
        max_length=255,
        blank=True,
    )

    last_name = models.CharField(
        max_length=255,
        blank=True,
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
    )

    location = models.CharField(
        max_length=255,
        blank=True,
    )

    bio = models.TextField(
        blank=True,
    )

    github = models.URLField(
        blank=True,
    )

    linkedin = models.URLField(
        blank=True,
    )

    website = models.URLField(
        blank=True,
    )

    resume = models.FileField(
        upload_to="profiles/resumes/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.user.username