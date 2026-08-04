import { api } from "../api.js";

const BASE_URL = "accounts/api/v1/password/"

export function forgotPassword(email) {

    return api.request(

        `${BASE_URL}forgot/`,

        {

            method: "POST",

            body: {

                email:email,

            },

        },

    );

}

export function resetPassword(data) {

    return api.request(

        `${BASE_URL}reset/`,

        {

            method: "POST",

            body: data,

        },

    );

}