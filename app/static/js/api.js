const API_BASE = "/";

class ApiClient {

    constructor() {

        this.accessToken =
            localStorage.getItem("access");

    }

    getHeaders() {

        const headers = {
            "Content-Type": "application/json",
        };

        if (this.accessToken) {

            headers["Authorization"] =
                `Bearer ${this.accessToken}`;
        }

        return headers;
    }

    async request(
        endpoint,
        options = {},
    ) {

        const response = await fetch(
            API_BASE + endpoint,
            {
                ...options,
                headers: {
                    ...this.getHeaders(),
                    ...(options.headers || {}),
                },
            },
        );

        if (!response.ok) {

            throw await response.json();
        }

        return response.json();

    }

}

const api = new ApiClient();
export { api };