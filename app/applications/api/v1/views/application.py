from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from jobs.models import Job
from applications.models import Application
from applications.api.v1.serializers import ApplicationSerializer
from applications.api.v1.permissions import IsApplicationOwner
from accounts.api.v1.permissions import IsJobSeeker,IsEmployer


class ApplicationViewSet(ModelViewSet):

    serializer_class = ApplicationSerializer

    def get_queryset(self):

        return Application.objects.select_related(
            "job",
            "job__company",
            "applicant",
        )

    def get_permissions(self):

        if self.action == "create":
            permissions = [IsAuthenticated,IsJobSeeker]

        elif self.action in ["update_status","applicants"]:
            permissions = [IsAuthenticated,IsEmployer]

        else:
            permissions = [IsAuthenticated,IsApplicationOwner]

        return [permission() for permission in permissions]
    
    @action(detail=False, methods=["get"], url_path="my-applications")
    def my_applications(self, request):

        if request.user.role != "JOB_SEEKER":
            return Response(
                {
                    "detail":
                    "Only job seekers can access this endpoint."
                },
                status=403,
            )

        queryset = self.get_queryset().filter(applicant=request.user)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)
    
    @action(detail=False,methods=["get"],url_path=r"jobs/(?P<job_id>\d+)/applicants")
    def applicants(self, request, job_id=None):

        if request.user.role != "EMPLOYER":

            return Response(
                {
                    "detail":
                    "Only employers can access this endpoint."
                },
                status=403,
            )

        job = get_object_or_404(Job.objects.select_related("company"),id=job_id)

        if job.company.owner != request.user:

            return Response(
                {
                    "detail":
                    "You do not own this job."
                },
                status=403,
            )

        queryset = self.get_queryset().filter(job=job)
        serializer = self.get_serializer(queryset,many=True)

        return Response(serializer.data)
    
    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()

        if request.user.role == "JOB_SEEKER":

            queryset = queryset.filter(
                applicant=request.user
            )

        elif request.user.role == "EMPLOYER":

            queryset = queryset.filter(
                job__company__owner=request.user
            )

        else:

            queryset = queryset.none()


        serializer = self.get_serializer(
            queryset,
            many=True
        )

        return Response(serializer.data)
    
    @action(detail=True, methods=["patch"])
    def update_status(self, request, pk=None):

        application = self.get_object()

        if application.job.company.owner != request.user:

            return Response(
                {
                    "detail": "You do not own this job."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        new_status = request.data.get("status")
        valid_statuses = ["PENDING", "ACCEPTED", "REJECTED", "REVIEWED"]

        if new_status not in valid_statuses:

            return Response(

                {
                    "detail": "Invalid status."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        application.status = new_status
        application.save()
        serializer = self.get_serializer(application)

        return Response(serializer.data)
