from django.urls import path

from .views import (
    HomeView,JobDetailPageView,LoginView,
    JobsListPageView,EmployerDashboardView,
    SeekerDashboardView,JobApplicantsPageView,
    RegisterView,ProfileView,CandidateProfileView,
    ForgotPasswordPageView,ResetPasswordPageView,
)    

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("forgot-password/", ForgotPasswordPageView.as_view(), name="forgot-password"),
    path("reset-password/", ResetPasswordPageView.as_view(), name="reset-password"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("profile/<int:user_id>/", CandidateProfileView.as_view(), name="candidate-profile"),
    path("jobs/", JobsListPageView.as_view(), name="jobs-list-page"),
    path("jobs/<int:pk>/", JobDetailPageView.as_view(), name="job-detail-page"),
    path("dashboard/seeker/", SeekerDashboardView.as_view(), name="seeker-dashboard"),
    path("dashboard/employer/", EmployerDashboardView.as_view(), name="employer-dashboard"),
    path("dashboard/employer/jobs/<int:pk>/applicants/", JobApplicantsPageView.as_view(), name="dashboard-job-applicants"),
]