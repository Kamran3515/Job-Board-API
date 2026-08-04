import { api } from "../api.js";

const BASE_URL = "accounts/api/v1/"

export async function login(data) {

    return await api.request(

        `${BASE_URL}login/`,

        {
            method: "POST",
            body: data,
            skipRefresh: true,
        },

    );

}

export function register(data) {

    return api.request(

        `${BASE_URL}register/`,

        {
            method: "POST",
            body: data,
        },

    );

}

export async function me() {

    return await api.request(

        `${BASE_URL}me/`

    );

}

export async function refreshAccessToken() {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) { return null;}

    const response = await fetch(
        `/${BASE_URL}refresh/`,
        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify({refresh}),

        },
    );

    if (!response.ok) {return null;}

    const data = await response.json();

    localStorage.setItem("access", data.access);

    return data.access;

}