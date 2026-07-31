from jobs.models import Job
from applications.models import Application
from rest_framework import serializers


class JobMiniSerializer(serializers.ModelSerializer):

    company = serializers.CharField(
        source="company.name",
        read_only=True,
    )

    class Meta:

        model = Job

        fields = [

            "id",

            "title",

            "company",

            "created_at",

        ]


class ApplicationMiniSerializer(serializers.ModelSerializer):

    job = serializers.CharField(

        source="job.title",

        read_only=True,

    )

    class Meta:

        model = Application

        fields = [

            "id",

            "job",

            "status",

            "applied_at",

        ]


class EmployerDashboardSerializer(serializers.Serializer):

    role = serializers.CharField()

    total_jobs = serializers.IntegerField()

    applications = serializers.IntegerField()

    pending = serializers.IntegerField()

    accepted = serializers.IntegerField()

    rejected = serializers.IntegerField()

    reviewed = serializers.IntegerField()

    recent_jobs = JobMiniSerializer(many=True)

    recent_applications = ApplicationMiniSerializer(many=True)


class SeekerDashboardSerializer(serializers.Serializer):

    role = serializers.CharField()

    applied_jobs = serializers.IntegerField()

    pending = serializers.IntegerField()

    accepted = serializers.IntegerField()

    rejected = serializers.IntegerField()

    reviewed = serializers.IntegerField()

    recent_applications = ApplicationMiniSerializer(many=True)