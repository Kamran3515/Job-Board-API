import { api } from "../api.js";

const BASE_URL = "accounts/api/v1/dashboard/";

export async function getDashboardStats() {

    return await api.request(BASE_URL);

}