import { api } from "../api.js";

export async function getHomeStats(){

    return api.request(
        "jobs/api/v1/home-stats/"
    );

}