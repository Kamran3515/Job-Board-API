from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from accounts.api.v1.permissions import IsAdmin,IsEmployer
from jobs.models import Skill
from jobs.api.v1.serializers import SkillSerializer

class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    @action(detail=False, methods=["get"], url_path="all")
    def all(self, request):

        serializer = self.get_serializer(
            self.get_queryset(),
            many=True,
        )

        return Response(serializer.data)
    
    def get_permissions(self):

        if (self.action == "create"):
            permissions = [
                IsAuthenticated,
                IsAdmin,
            ]
        else:
            permissions = [IsAuthenticated]

        return [permission() for permission in permissions]