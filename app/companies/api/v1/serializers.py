from rest_framework import serializers
from companies.models import Company
from jobs.models import Job


class CompanyJobSerializer(serializers.ModelSerializer):

    company_logo = serializers.SerializerMethodField()
    company_name = serializers.CharField(
        source="company.name",
        read_only=True,
    )
    company_location = serializers.CharField(
        source="company.location",
        read_only=True,
    )

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "location",
            "salary_min",
            "salary_max",
            "job_type",
            "experience_level",
            "created_at",
            "company_logo",
            "company_name",
            "company_location",
            "company",
            "skills"
        ]

    def get_company_logo(self, obj):

        if obj.company.logo:
            return obj.company.logo.url

        return None
   
class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = (
            "id",
            "name",
            "description",
            "website",
            "location",
            "logo",
            "created_at",
        )

        read_only_fields = (
            "id",
            "created_at",
        )

    def validate(self, attrs):

        request = self.context["request"]

        if (
            request.method == "POST"
            and Company.objects.filter(owner=request.user).exists()
        ):
            raise serializers.ValidationError(
                "You already have a company."
            )

        return attrs

    def create(self, validated_data):

        return Company.objects.create(
            owner=self.context["request"].user,
            **validated_data
        )

class CompanyDetailSerializer(serializers.ModelSerializer):

    is_owner = serializers.SerializerMethodField()
    jobs = CompanyJobSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Company
        fields = (
            "id",
            "name",
            "description",
            "website",
            "location",
            "logo",
            "jobs",
            "is_owner",
            "created_at",
        )

    def get_is_owner(self, obj):

        request = self.context.get("request")

        if not request or request.user.is_anonymous:
            return False

        return obj.owner == request.user