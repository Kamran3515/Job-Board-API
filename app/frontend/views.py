from django.views.generic import TemplateView


class LoginView(TemplateView):
    template_name = "pages/auth/login.html"

class RegisterView(TemplateView):
    template_name = "pages/auth/register.html"

class ForgotPasswordPageView(TemplateView):
    template_name = "pages/auth/forgotPassword.html"

class ResetPasswordPageView(TemplateView):
    template_name = "pages/auth/resetPassword.html"

class ProfileView(TemplateView):
    template_name = "pages/profile.html"

class CandidateProfileView(TemplateView):

    template_name = "pages/profile.html"

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        context["candidate_id"] = self.kwargs["user_id"]

        return context

class HomeView(TemplateView):
    template_name = "pages/home.html"

class JobsListPageView(TemplateView):
    template_name = "pages/jobs/list.html"

class JobDetailPageView(TemplateView):
    template_name = "pages/jobs/detail.html"

class EmployerDashboardView(TemplateView):
    template_name = "pages/dashboard/employer.html"
    
class SeekerDashboardView(TemplateView):
    template_name = "pages/dashboard/seeker.html"

class JobApplicantsPageView(TemplateView):
    template_name = "pages/dashboard/jobApplicants.html"