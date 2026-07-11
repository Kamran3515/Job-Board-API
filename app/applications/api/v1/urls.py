from rest_framework.routers import DefaultRouter

from .views.application import (
    ApplicationViewSet,
)

router = DefaultRouter()

router.register(
    "",
    ApplicationViewSet,
    basename="applications",
)

urlpatterns = router.urls