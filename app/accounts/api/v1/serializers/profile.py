import os,json
from rest_framework import serializers
from accounts.models import Profile
from jobs.models import Skill
from common.constants import (
    MAX_AVATAR_SIZE,
    MAX_RESUME_SIZE,
    ALLOWED_IMAGE_EXTENSIONS,
    ALLOWED_IMAGE_TYPES,
    ALLOWED_RESUME_EXTENSIONS,
    ALLOWED_RESUME_TYPES,
)


class ProfileSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(source="user.email", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    role = serializers.CharField(source="user.role", read_only=True)
    avatar = serializers.ImageField(required=False, allow_null=True)
    resume = serializers.FileField(required=False, allow_null=True)
    skills = serializers.SlugRelatedField(
        many=True,
        slug_field="name",
        queryset=Skill.objects.all(),
        required=False,
    )


    class Meta:

        model = Profile

        fields = [

            "id",

            "username",
            "email",
            "role",

            "first_name",
            "last_name",

            "phone",
            "location",
            "bio",

            "github",
            "linkedin",
            "website",

            "avatar",
            "skills",
            "resume",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [

            "created_at",
            "updated_at",
        ]

    def to_internal_value(self, data):

        data = data.copy()

        skills = data.get("skills")

        if isinstance(skills, str):

            try:

                data.setlist(
                    "skills",
                    json.loads(skills)
                )

            except Exception:

                pass

        return super().to_internal_value(data)

    def validate_avatar(self, value):

        if value.size > MAX_AVATAR_SIZE:

            raise serializers.ValidationError(
                "Avatar size must be less than 2 MB."
            )

        ext = os.path.splitext(value.name)[1].lower()

        if ext not in ALLOWED_IMAGE_EXTENSIONS:

            raise serializers.ValidationError(
                "Only JPG, JPEG, PNG and WEBP files are allowed."
            )

        if value.content_type not in ALLOWED_IMAGE_TYPES:
            raise serializers.ValidationError(
                "Invalid image type."
            )

        return value
    
    def validate_resume(self, value):

        if value.size > MAX_RESUME_SIZE:

            raise serializers.ValidationError(
                "Resume size must be less than 5 MB."
            )

        ext = os.path.splitext(value.name)[1].lower()

        if ext not in ALLOWED_RESUME_EXTENSIONS:

            raise serializers.ValidationError(
                "Resume must be a PDF file."
            )
        
        if value.content_type not in ALLOWED_RESUME_TYPES:
            raise serializers.ValidationError(
                "Invalid file type."
            )

        return value
    
    def to_representation(self, instance):

        data = super().to_representation(instance)

        request = self.context.get("request")

        if request:

            if instance.avatar:
                data["avatar"] = request.build_absolute_uri(instance.avatar.url)

            if instance.resume:
                data["resume"] = request.build_absolute_uri(instance.resume.url)

        return data
    
