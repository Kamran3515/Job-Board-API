import { api } from "../api.js";
import { getJob } from "../services/jobs.js";
import { applyJob } from "../services/applications.js";
import { toast } from "../utils/toast.js";
import { isAuthenticated, getCurrentUser, } from "../authManager.js";
import { jobDetailCard } from "../components/jobDetailCard.js";
import { initializeApply } from "../components/applyManager.js";
import { state } from "../components/profile/profileState.js";

const container = document.getElementById("job-detail");

const jobId = window.location.pathname.split("/").filter(Boolean).pop();

async function loadJob() {

    try {
        const job = await getJob(jobId);
        renderJob(job);
    }

    catch (error) {
        console.error(error);
        toast.error(error)
    }
}

function renderJob(job) {
    container.innerHTML = jobDetailCard(job);
    initializeApply({jobId:jobId, hasApplied: job.has_applied});
}

loadJob();