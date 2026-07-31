import { refreshAccessToken } from "./services/auth.js";
import { clearTokens } from "./authManager.js";

const API_BASE = "/";
let isRefreshing = false;

class ApiClient {

    getHeaders(isFormData = false) {

        const headers = {};

        if (!isFormData) {

            headers["Content-Type"] = "application/json";

        }

        const token = localStorage.getItem("access");

        if (token) {

            headers["Authorization"] = `Bearer ${token}`;

        }

        return headers;

    }

    prepareBody(body) {

        if (body == null) {

            return undefined;

        }

        if (body instanceof FormData) {

            return body;

        }

        return JSON.stringify(body);

    }

    async request(endpoint, options = {}) {

        const isFormData =
            options.body instanceof FormData;

        let response;
        
        try {
            const controller = new AbortController();
            
            const timeout = setTimeout(
                () => controller.abort(),
                10000
            );
            response = await fetch(

                API_BASE + endpoint,

                {

                    ...options,
                    signal: controller.signal,
                    body: this.prepareBody(options.body),
                    headers: {

                        ...this.getHeaders(isFormData),
                        ...(options.headers || {}),

                    },

                },

            );
            clearTimeout(timeout);

        }

        catch(error) {


            if (error.name === "AbortError") {

                throw {
                    detail:"Request timeout. Please try again.",
                };
            }
            throw {

                detail:
                "Network error. Please check your internet connection.",
            };
        }

        if (

            response.status === 401 &&
            !options._retry &&
            !options.skipRefresh
        ) {

            return this.retryRequest(

                endpoint,

                options,

            );

        }

        if (!response.ok) {

            throw await this.handleError(response);

        }

        if (response.status === 204) {

            return null;

        }

        return await response.json();

    }

    async retryRequest(endpoint, options) {

        if (isRefreshing) {

            throw {
                detail: "Authentication in progress."
            };

        }

        isRefreshing = true;

        try {

            const access = await refreshAccessToken();

            if (!access) {

                clearTokens();

                throw {
                    detail: "Session expired."
                };

            }

            return this.request(
                endpoint,
                {
                    ...options,
                    _retry: true,
                }
            );

        }

        finally {

            isRefreshing = false;

        }

    }

    async handleError(response) {

        try {

            const data =
                await response.json();

            return data;

        }

        catch {

            switch (response.status) {

                case 403:

                    return {

                        detail:

                        "You don't have permission to perform this action.",

                    };

                case 404:

                    return {

                        detail:

                        "Resource not found.",

                    };

                case 500:

                    return {

                        detail:

                        "Internal server error.",

                    };

                default:

                    return {

                        detail:

                        "Something went wrong.",

                    };

            }

        }

    }

    normalizeError(error) {

        if (typeof error === "string") {

            return error;

        }

        if (error.detail) {

            return error.detail;

        }

        return Object.values(error)

            .flat()

            .join("\n");

    }

}

export const api = new ApiClient();