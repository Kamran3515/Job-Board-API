from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class ForgotPasswordSerializer(serializers.Serializer):

    email = serializers.EmailField()

    def validate_email(self, value):
        return value.lower()


class ResetPasswordSerializer(serializers.Serializer):

    uid = serializers.CharField()

    token = serializers.CharField()

    password = serializers.CharField(
        min_length=8,
        write_only=True,
    )

    confirm_password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:

            raise serializers.ValidationError(

                {
                    "confirm_password":
                        "Passwords do not match."
                }

            )

        return attrs