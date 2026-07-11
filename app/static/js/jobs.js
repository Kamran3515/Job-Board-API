import { api } from "./api.js";

export async function getJobs() {

    return await api.request(
        "jobs/api/v1/"
    );

}