import uuid

from django.utils import timezone
from rest_framework import serializers

from applications.models import Application
from jobs.models import Job

import os
import shutil
from django.conf import settings
from django.core.files import File
from applications.utils import build_profile_snapshot


def copy_resume(profile):

    if not profile.resume:

        return None

    source = profile.resume.path

    ext = os.path.splitext(source)[1]

    filename = f"{uuid.uuid4().hex}{ext}"

    destination_dir = os.path.join(
        settings.MEDIA_ROOT,
        "applications",
        "resumes",
    )

    os.makedirs(destination_dir,exist_ok=True)

    destination = os.path.join(destination_dir,filename)

    shutil.copy2(source,destination)

    return os.path.join(
        "applications",
        "resumes",
        filename,
    )



class ApplicationSerializer(serializers.ModelSerializer):

    job_title = serializers.CharField(source="job.title", read_only=True)
    company_name = serializers.CharField(source="job.company.name", read_only=True)
    applicant_name = serializers.CharField(source="applicant.username", read_only=True)
    applicant_id = serializers.IntegerField(source="applicant.id", read_only=True)

    class Meta:
        model = Application
        fields = [
            "id",

            "job",
            "job_title",
            "company_name",

            "applicant",
            "applicant_id",
            "applicant_name",

            "cover_letter",
            "resume",
            "snapshot",
            "status",

            "applied_at",
            "updated_at",
        ]

        read_only_fields = [
            "applicant",
            "status",
            "applied_at",
            "updated_at",
        ]

    def validate_job(self, job: Job):

        request = self.context["request"]

        # Employer cannot apply to own job
        if job.company.owner == request.user:
            raise serializers.ValidationError(
                "You cannot apply for your own job."
            )

        # Job must be active
        if not job.is_active:
            raise serializers.ValidationError(
                "This job is inactive."
            )

        # Job must not be expired
        if job.expires_at < timezone.now().date():
            raise serializers.ValidationError(
                "This job has expired."
            )

        return job

    def validate(self, attrs):

        request = self.context["request"]
        job = attrs["job"]

        if Application.objects.filter(
            applicant=request.user,
            job=job,
        ).exists():
            raise serializers.ValidationError(
                {
                    "job": "You have already applied for this job."
                }
            )

        return attrs

    def create(self, validated_data):

        user = self.context["request"].user

        validated_data["applicant"] = user

        profile = user.profile

        validated_data["snapshot"] = build_profile_snapshot(profile)

        copied_resume = copy_resume(profile)

        if copied_resume:

            validated_data["resume"] = copied_resume

        return super().create(validated_data)

    def to_representation(self, instance):

        data = super().to_representation(instance)

        request = self.context.get("request")

        if request and instance.resume:

            data["resume"] = request.build_absolute_uri(
                instance.resume.url
            )

        return data