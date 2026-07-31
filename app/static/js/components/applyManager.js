import { applyJob } from "../services/applications.js";
import { api } from "../api.js";
import { isAuthenticated, getCurrentUser } from "../authManager.js";
import { toast } from "../utils/toast.js";

const state = {

    modal: null,
    form: null,
    applyBtn: null,
    submitBtn: null,
    jobId: null,
    hasApplied: false,

};

export function initializeApply({jobId, hasApplied}) {
  
    state.jobId = jobId;
    state.hasApplied = hasApplied;
    state.modal = new bootstrap.Modal(document.getElementById("applyModal"));
    state.form =document.getElementById("apply-form");
    state.submitBtn = document.getElementById("submit-application-btn");
    state.applyBtn = document.getElementById("apply-btn");

    state.applyBtn.onclick = null;
    state.applyBtn.addEventListener("click",openApplyModal);

    state.form.onsubmit = null;
    state.form.addEventListener("submit",submitApplication);

    configureApplyButton();
}

function disableApplyButton(text) {

    state.applyBtn.disabled = true;
    state.applyBtn.classList.remove("btn-success");
    state.applyBtn.classList.add("btn-secondary");
    state.applyBtn.textContent = text;

}

async function configureApplyButton() {

    if (!isAuthenticated()) {return;}

    try {

        const user = getCurrentUser();

        if (state.hasApplied){
            disableApplyButton("Already Applied")
            return;
        }

        if (user.role !== "JOB_SEEKER") {

            disableApplyButton("Only Job Seekers Can Apply")
        }
    }

    catch (error) {toast.error(error)}

}

function openApplyModal() {

    if (!isAuthenticated()) {

        toast.warning("Please login first.");

        setTimeout(() => {
            window.location = "/login/";
        }, 1000);

        return;

    }

    const user = getCurrentUser();

    if (!user) {return;}

    if (user.role !== "JOB_SEEKER") {

        toast.warning("Only Job Seekers can apply.")

        return;

    }
    state.modal.show();

}

async function submitApplication(e) {

    e.preventDefault();

    const coverLetter = document.getElementById("cover-letter").value.trim();

    try {

        state.submitBtn.disabled = true;
        state.submitBtn.innerHTML = `

            <span
                class="spinner-border spinner-border-sm me-2">
            </span>

            Submitting...

        `;

        await applyJob(state.jobId,coverLetter);

        state.modal.hide();
        state.form.reset();

        disableApplyButton("Applied")

        toast.success("Application submitted successfully.")

    }

    catch (error) {

        if ( error.detail === "You have already applied.") {

            disableApplyButton("Already Applied");
        }

        toast.error(error);

    }

    finally {
        state.submitBtn.disabled = false;
        state.submitBtn.textContent = "Submit Application";
    }

}