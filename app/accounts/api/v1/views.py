from accounts.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)
