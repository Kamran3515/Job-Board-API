import { api } from "../api.js";

export async function getProfile() {
    return await api.request("accounts/api/v1/profile/");
}

export function updateProfile(formData) {
    return api.request(
        "accounts/api/v1/profile/",
        {
            method: "PATCH",
            body: formData,
        }
    );
}

export function getProfileByUser(userId) {

    return api.request(

        `accounts/api/v1/profile/user/${userId}/`

    );

}

export function getSkills() {

    return api.request(
        "jobs/api/v1/skills/"
    );

}