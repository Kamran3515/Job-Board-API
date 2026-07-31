from rest_framework import serializers
from accounts.models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
import logging

logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "role",
        )

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "password",
            "role",
        )

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User.objects.create_user(

            password=password,

            **validated_data,

        )

        try:

            html = render_to_string(

                "emails/welcome.html",

                {

                    "user": user,

                },

            )

            email = EmailMultiAlternatives(

                subject="Welcome to Job Board",

                body="",

                to=[user.email],

            )

            email.attach_alternative(

                html,

                "text/html",

            )

            email.send()

        except Exception as error:

            logger.exception(error)

        return user