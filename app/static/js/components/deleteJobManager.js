import { deleteJob } from "../services/jobs.js";
import { api } from "../api.js";
import { toast } from "../utils/toast.js";

let modal;
let deletingJobId = null;
let getJobs = () => [];
let onSuccess = () => {};

export function initializeDeleteModal({ getJobs: jobs, onSuccess: success}) {

    getJobs = jobs;
    onSuccess = success;

    modal = new bootstrap.Modal(document.getElementById("deleteJobModal"));

    document.getElementById("confirm-delete-job")
        .addEventListener("click",confirmDeleteJob);

    document.getElementById("deleteJobModal")
        .addEventListener(
            "hidden.bs.modal",
            () => {
                deletingJobId = null;
            },
        );
}

export function openDeleteModal(id) {

    deletingJobId = id;

    const job = getJobs().find(j => j.id === id);

    if (!job) {return;}

    document.getElementById("delete-job-title").textContent =job.title;

    modal.show();

}

async function confirmDeleteJob() {

    try {

        await deleteJob(deletingJobId);

        modal.hide();

        deletingJobId = null;

        toast.success("Job deleted successfully.")

        await onSuccess();

    }
    catch {
        toast.error("Failed to delete job.")
    }
}

