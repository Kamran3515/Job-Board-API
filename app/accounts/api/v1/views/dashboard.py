from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from applications.models import Application
from jobs.models import Job

from accounts.models import User

from ..serializers.dashboard import (
    EmployerDashboardSerializer,
    SeekerDashboardSerializer,
)


class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        if user.role == User.Role.EMPLOYER:

            jobs = Job.objects.filter(company__owner=user)
            applications = Application.objects.filter(job__company__owner=user)

            recent_jobs = jobs.order_by("-created_at")[:5]
            recent_applications = applications.order_by("-applied_at")[:5]


            data = {

                "role": "EMPLOYER",

                "total_jobs": jobs.count(),

                "applications": applications.count(),

                "pending": applications.filter(
                    status=Application.Status.PENDING,
                ).count(),

                "reviewed": applications.filter(
                    status=Application.Status.REVIEWED,
                ).count(),

                "accepted": applications.filter(
                    status=Application.Status.ACCEPTED,
                ).count(),

                "rejected": applications.filter(
                    status=Application.Status.REJECTED,
                ).count(),

                "recent_jobs": recent_jobs,

                "recent_applications": recent_applications,

            }

            serializer = EmployerDashboardSerializer(data)

            return Response(serializer.data)

        applications = Application.objects.filter(applicant=user)
        recent_applications = applications.order_by("-applied_at")[:5]

        data = {

            "role": "JOB_SEEKER",

            "applied_jobs": applications.count(),

            "pending": applications.filter(
                status=Application.Status.PENDING,
            ).count(),

            "accepted": applications.filter(
                status=Application.Status.ACCEPTED,
            ).count(),

            "reviewed": applications.filter(
                status=Application.Status.REVIEWED,
            ).count(),

            "rejected": applications.filter(
                status=Application.Status.REJECTED,
            ).count(),

            "recent_applications": recent_applications,
        }

        serializer = SeekerDashboardSerializer(data)

        return Response(serializer.data)