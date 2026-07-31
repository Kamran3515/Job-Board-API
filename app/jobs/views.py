from rest_framework.decorators import api_view
from rest_framework.response import Response

from jobs.models import Job
from companies.models import Company
from applications.models import Application


@api_view(["GET"])
def home_stats(request):

    return Response({

        "jobs": Job.objects.filter(is_active=True).count(),

        "companies": Company.objects.count(),

        "applications": Application.objects.count(),

    })