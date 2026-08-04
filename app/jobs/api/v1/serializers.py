from rest_framework import serializers
from django.utils import timezone
from jobs.models import Job, Skill
from applications.models import Application


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            "id",
            "name",
        ]


class JobSerializer(serializers.ModelSerializer):

    skills = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Skill.objects.all(),
        required=False,
    )
    
    company_name = serializers.CharField(source="company.name", read_only=True)
    company_logo = serializers.SerializerMethodField()
    company_location = serializers.CharField(source="company.location", read_only=True)
    applications_count = serializers.IntegerField(read_only=True)
    has_applied = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "id",
            "company",
            "company_name",
            "company_location",
            "company_logo",
            "applications_count",
            "title",
            "description",
            "requirements",
            "location",
            "salary_min",
            "salary_max",
            "job_type",
            "work_mode",
            "experience_level",
            "skills",
            "has_applied",
            "is_active",
            "expires_at",
            "created_at",
        ]

        read_only_fields = [
            "created_at",
        ]

    def get_company_logo(self, obj):

        if obj.company.logo:
            return obj.company.logo.url

        return None

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
    def get_has_applied(self, obj):

        request = self.context.get("request")

        if (not request or request.user.is_anonymous):
            return False

        return Application.objects.filter(
            applicant=request.user,
            job=obj,
        ).exists()