import { api } from "../api.js";

const BASE_URL = "companies/api/v1/";

export async function getMyCompanies() {

    return await api.request(
        `${BASE_URL}my/`
    );

}

export async function createCompany(data) {

    return await api.request(

        BASE_URL,

        {

            method: "POST",

            body: data,

        },

    );

}