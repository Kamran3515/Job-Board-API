import {createJob,updateJob} from "../services/jobs.js";
import { toast } from "../utils/toast.js";
import { showToast } from "./showToast.js";

import { getSelectedSkills, loadSkills } from "./skill.js"
import { api } from "../api.js";


const state = {

    form:null,
    modal:null,
    submitBtn:null,
    createBtn:null,
    title:null,
    description:null,
    requirements:null,
    location:null,
    company:null,
    salaryMin:null,
    salaryMax:null,
    jobType:null,
    workMode:null,
    experienceLevel:null,
    skillsSelect:null,
    expireDays:null,
    editingJobId:null,
    jobModalTitle:null,
    skills:[],
    getJobs:()=>[],
    onSuccess:()=>{}
}

export async function initializeJobModal({onSuccess:success, getJobs:jobs}) {
    state.getJobs = jobs;
    state.onSuccess = success;
    state.modal = new bootstrap.Modal(document.getElementById("jobModal"));
    state.submitBtn = document.getElementById("job-submit-btn");

    await loadSkills([]);

    state.createBtn = document.getElementById("create-job-btn");
    state.createBtn.removeEventListener("click", openCreateModal);
    state.createBtn.addEventListener("click",openCreateModal);

    state.form = document.getElementById("job-form")
    state.form.removeEventListener("submit", submitJob);
    state.form.addEventListener("submit",submitJob);

    state.jobModalTitle = document.getElementById("job-modal-title")

    state.title = document.getElementById("title");
    state.description = document.getElementById("description");
    state.requirements = document.getElementById("requirements");
    state.location = document.getElementById("location");
    state.company = document.getElementById("company");
    state.salaryMin = document.getElementById("salary_min");
    state.salaryMax = document.getElementById("salary_max");
    state.jobType = document.getElementById("job_type");
    state.workMode = document.getElementById("work_mode");
    state.experienceLevel = document.getElementById("experience_level");
    state.expireDays = document.getElementById("expire_days");

    document.getElementById("jobModal")
        .addEventListener("hidden.bs.modal",resetModal);

}

function calculateExpireDate() {

    const days = Number(state.expireDays.value);
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
}

function buildPayload() {

    if (!state.title.value.trim()) {
        toast.error("Title is required.");
        return;
    }
    if (!state.description.value.trim()) {
        toast.error("Description is required.");
        return;
    }
    if (!state.requirements.value.trim()) {
        toast.error("Requirements are required.");
        return;
    }
    if (!state.location.value.trim()) {
        toast.error("Location is required.");
        return;
    }
    if ( Number(state.salaryMin.value) > Number(state.salaryMax.value) ) {
        toast.error("Minimum salary cannot be greater than maximum salary.");
        return;
    }
    return {
        company: Number(state.company.value),
        title: state.title.value.trim(),
        description: state.description.value.trim(),
        requirements: state.requirements.value.trim(),
        location: state.location.value.trim(),
        salary_min: Number(state.salaryMin.value),
        salary_max: Number(state.salaryMax.value),
        work_mode: state.workMode.value,
        job_type: state.jobType.value,
        experience_level: state.experienceLevel.value,
        skills: getSelectedSkills(),
        expires_at: calculateExpireDate(),
    };

}

async function openCreateModal() {

    state.form.reset();
    await loadSkills([]);
    state.jobModalTitle.textContent = "Create Job";
    state.submitBtn.textContent = "Save Job";
    state.modal.show();
}

export async function openEditModal(id) {

    state.editingJobId = id;
    const job = state.getJobs().find(j => j.id === id);
    if (!job) { return; }

    state.title.value = job.title;
    state.description.value = job.description;
    state.requirements.value = job.requirements;
    state.location.value = job.location;
    state.salaryMin.value = job.salary_min;
    state.salaryMax.value = job.salary_max;
    state.jobType.value = job.job_type;
    state.workMode.value = job.work_mode;
    state.experienceLevel.value = job.experience_level;
    state.company.value = job.company;
    
    await loadSkills(job.skills);

    state.jobModalTitle.textContent = "Edit Job";
    state.submitBtn.textContent = "Update Job";
    state.modal.show();

}

function resetModal() {

    state.form.reset();
    state.jobModalTitle.textContent = "Create Job";
    state.submitBtn.textContent = "Save Job";

}

async function submitJob(e) {

    e.preventDefault();

    if (Number(state.salaryMin.value) > Number(state.salaryMax.value)) {

        toast.warning("Minimum salary cannot be greater than maximum salary.")
        return;
    }
    const data = buildPayload();
    const isEditing = state.editingJobId !== null;

    try {
        state.submitBtn.disabled = true;
        state.submitBtn.innerHTML = `

            <span
            class="spinner-border spinner-border-sm me-2">

            </span>

            Saving...

            `;

        if (state.editingJobId) {
            await updateJob(state.editingJobId,data);
        }
        else {
            await createJob(data);
        }

        state.form.reset();
        state.jobModalTitle.textContent = "Create Job";
        state.submitBtn.textContent = "Save Job";
        state.modal.hide();

        showToast(

            isEditing
                ? "Job updated successfully."
                : "Job created successfully.",

            "success",
        );

        state.editingJobId = null;
        await state.onSuccess();

    }

    catch (error) {

        toast.error(error)
    }

    finally {

        state.submitBtn.disabled = false;

        state.submitBtn.textContent =
            state.editingJobId
                ? "Update Job"
                : "Save Job";

    }

}
