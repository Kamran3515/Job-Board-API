from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views.job import JobViewSet,home_stats
from .views.skill import SkillViewSet

job_router = DefaultRouter()
job_router.register("", JobViewSet, basename="jobs")

skill_router = DefaultRouter()
skill_router.register("", SkillViewSet, basename="skills")


urlpatterns = [
    path("skills/", include(skill_router.urls)),
    path("home-stats/", home_stats, name="home_stats"),
    path("", include(job_router.urls)),
]