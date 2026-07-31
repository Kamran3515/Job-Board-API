import { api } from "../api.js";

export async function getAllSkills() {

    return await api.request(
        "jobs/api/v1/skills/all"
    );

}