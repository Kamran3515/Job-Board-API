from rest_framework import serializers

from companies.models import Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = (
            "id",
            "name",
            "description",
            "website",
            "location",
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