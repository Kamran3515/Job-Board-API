from rest_framework import serializers
from django.utils import timezone
from companies.models import Company
from jobs.models import Job, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "id",
            "name",
        ]


class JobSerializer(serializers.ModelSerializer):

    skills = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        many=True,
        required=False,
    )

    class Meta:
        model = Job
        fields = [
            "id",
            "company",
            "title",
            "description",
            "requirements",
            "location",
            "salary_min",
            "salary_max",
            "job_type",
            "experience_level",
            "skills",
            "is_active",
            "expires_at",
            "created_at",
        ]

        read_only_fields = [
            "created_at",
        ]

    def validate(self, attrs):

        salary_min = attrs.get("salary_min")
        salary_max = attrs.get("salary_max")

        if (
            salary_min is not None
            and salary_max is not None
            and salary_min > salary_max
        ):
            raise serializers.ValidationError(
                {
                    "salary": "salary_min cannot be greater than salary_max."
                }
            )

        return attrs
    
    def validate_company(self, company):

        request = self.context["request"]

        if company.owner != request.user:
            raise serializers.ValidationError(
                "You are not the owner of this company."
            )

        return company
    
    def validate_expires_at(self, value):

        if value <= timezone.now().date():
            raise serializers.ValidationError(
                "Expiration date must be in the future."
            )

        return value