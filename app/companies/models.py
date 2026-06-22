from django.conf import settings
from django.db import models


class Company(models.Model):
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="company"
    )

    name = models.CharField(max_length=255)
    description = models.TextField()
    website = models.URLField(blank=True)
    location = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name