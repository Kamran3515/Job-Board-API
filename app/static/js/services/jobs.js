import { api } from "../api.js";

const BASE_URL = "jobs/api/v1/";

export function getJobs(params = {}) {

    const query = new URLSearchParams(params).toString();

    const url = query
        ? `${BASE_URL}?${query}`
        : BASE_URL;

    return api.request(url);

}

export function getJob(id) {

    return api.request(
        `${BASE_URL}${id}/`
    );

}

export function getMyJobs() {

    return api.request(

        `${BASE_URL}my/`
    );
}

export function createJob(data) {

    return api.request(

        BASE_URL,

        {
            method: "POST",
            body: data,
        },

    );

}

export function updateJob(id, data) {

    return api.request(

        `${BASE_URL}${id}/`,

        {

            method: "PATCH",
            body: data,

        },

    );

}

export function deleteJob(id) {

    return api.request(

        `${BASE_URL}${id}/`,

        {

            method: "DELETE",

        },

    );

}