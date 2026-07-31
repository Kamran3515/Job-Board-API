from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError

from ..serializers.password import ForgotPasswordSerializer, ResetPasswordSerializer


User = get_user_model()


class ForgotPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = ForgotPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True,
        )

        email = serializer.validated_data["email"]

        user = User.objects.filter(
            email=email,
        ).first()

        if user:

            uid = urlsafe_base64_encode(

                force_bytes(user.pk)

            )

            token = PasswordResetTokenGenerator().make_token(

                user

            )
            print(uid)
            print(token)

            reset_link = (
                f"http://{get_current_site(request).domain}"
                f"/reset-password/"
                f"?uid={uid}&token={token}"
            )

            print(reset_link)

            message = render_to_string(

                "emails/reset_password.html",

                {

                    "user": user,

                    "reset_link": reset_link,

                },

            )

            send_mail(

                subject="Reset your password",

                message="",

                from_email=None,

                recipient_list=[user.email],

                html_message=message,

            )

        return Response(

            {

                "detail":

                "If an account with this email exists, a reset link has been sent."

            },

            status=status.HTTP_200_OK,

        )

class ResetPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = ResetPasswordSerializer(

            data=request.data,

        )

        serializer.is_valid(

            raise_exception=True,

        )

        uid = serializer.validated_data["uid"]

        token = serializer.validated_data["token"]

        password = serializer.validated_data["password"]

        try:

            user = User.objects.get(

                pk=force_str(

                    urlsafe_base64_decode(uid)

                )

            )

        except (

            User.DoesNotExist,

            ValueError,

            TypeError,

            OverflowError,

        ):

            raise ValidationError(

                {

                    "detail":

                    "Invalid reset link."

                }

            )

        if not PasswordResetTokenGenerator().check_token(

            user,

            token,

        ):

            raise ValidationError(

                {

                    "detail":

                    "Reset link has expired or is invalid."

                }

            )

        user.set_password(password)

        user.save()

        return Response(

            {

                "detail":

                "Password changed successfully."

            },

            status=status.HTTP_200_OK,

        )

    