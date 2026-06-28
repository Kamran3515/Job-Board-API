from django.contrib import admin
from .models import Job, Skill

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "job_type", "is_active")
    list_filter = ("job_type", "is_active")
    search_fields = ("title",)
admin.site.register(Skill)