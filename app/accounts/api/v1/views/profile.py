from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from accounts.api.v1.serializers.profile import ProfileSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from accounts.models import Profile


class ProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser]

    def get_object(self):

        user_id = self.kwargs.get("pk")


        if user_id:

            return get_object_or_404(
                Profile,
                user_id=user_id,
            )


        return self.request.user.profile
    
    def update(self, request, *args, **kwargs):

        if "pk" in kwargs:

            return Response(
                {
                    "detail":
                    "You cannot edit another user's profile."
                },
                status=403,
            )

        return super().update(
            request,
            *args,
            **kwargs
        )