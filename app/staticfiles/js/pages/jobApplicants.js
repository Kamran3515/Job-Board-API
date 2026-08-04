import {
    getJobApplicants,
    updateApplicationStatus,
} from "../services/applications.js";
import { api } from "../api.js";
import { applicantCard } from "../components/applicantCard.js";
import { toast } from "../utils/toast.js";

const container = document.getElementById("applicants-container");

async function loadApplicants() {

    try {

        const applications = await getJobApplicants(window.jobId);

        renderApplicants(applications);

    }

    catch (error) {

        toast.error(
            api.normalizeError(error) ||
            "Something went wrong.",
        );

    }

}

function renderApplicants(applications) {

    if (applications.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-info">

                    No applicants yet.

                </div>

            </div>

        `;

        return;

    }

    container.innerHTML = applications
        .map(application => applicantCard(application))
        .join("");

}

container.addEventListener(

    "click",

    (e) => {

        const button = e.target.closest("button");

        if (!button) {
            return;
        }

        if (button.classList.contains("review-applicant")) {
            updateStatus(
                Number(button.dataset.id),
                "REVIEWED",
            );
        }

        if (button.classList.contains("accept-applicant")) {

            updateStatus(
                Number(button.dataset.id),
                "ACCEPTED",
            );

        }

        else if (button.classList.contains("reject-applicant")) {

            updateStatus(
                Number(button.dataset.id),
                "REJECTED",
            );

        }

    },

);

async function updateStatus(applicationId, status) {

    const reviewBtn = document.getElementById(`review-${applicationId}`);
    const acceptBtn = document.getElementById(`accept-${applicationId}`);
    const rejectBtn = document.getElementById(`reject-${applicationId}`);

    try {

        if (reviewBtn) {
            reviewBtn.disabled = true;
        }
        if (acceptBtn) {
            acceptBtn.disabled = true;
        }
        if (rejectBtn) {
            rejectBtn.disabled = true;
        }

        await updateApplicationStatus(
            applicationId,
            status,
        );

        toast.success("Application updated successfully.");

        await loadApplicants();

    }

    catch (error) {

        if (acceptBtn) {
            acceptBtn.disabled = false;
        }

        if (rejectBtn) {
            rejectBtn.disabled = false;
        }

        toast.error(
            api.normalizeError(error) ||
            "Failed to update application.",
        );

    }

}

loadApplicants();