import { api } from "../api.js";

const BASE_URL = "applications/api/v1/"

export function applyJob(jobId,coverLetter) {

    return api.request(

        BASE_URL,
        {
            method: "POST",
            body: {
                job: Number(jobId),
                cover_letter: coverLetter,
            },
        },
    );
}

export function getMyApplications() {

    return api.request(`${BASE_URL}my-applications/`);

}

export function getJobApplicants(jobId) {

    return api.request(`jobs/api/v1/${jobId}/applicants/`);

}

export function updateApplicationStatus(applicationId, status) {

    return api.request(

        `${BASE_URL}${applicationId}/update_status/`,

        {
            method: "PATCH",
            body: {
                status: status,
            },
        },
    );
}