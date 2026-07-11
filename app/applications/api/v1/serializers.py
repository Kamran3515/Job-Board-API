from django.utils import timezone
from rest_framework import serializers

from applications.models import Application
from jobs.models import Job


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "cover_letter",
            "resume",
            "status",
            "applied_at",
            "updated_at",
        ]

        read_only_fields = [
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

        validated_data["applicant"] = self.context["request"].user

        return super().create(validated_data)