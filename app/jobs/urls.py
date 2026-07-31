from django.urls import path,include
from .views import home_stats

urlpatterns = [
    path("api/v1/", include("jobs.api.v1.urls")),
]