import { me } from "./services/auth.js";


export function saveTokens(access, refresh) {

    localStorage.setItem(
        "access",
        access,
    );

    localStorage.setItem(
        "refresh",
        refresh,
    );

}

export function clearTokens() {

    localStorage.removeItem(
        "access",
    );

    localStorage.removeItem(
        "refresh",
    );

    localStorage.removeItem(
        "currentUser",
    );

}

export function getAccessToken() {

    return localStorage.getItem("access");

}

export function getRefreshToken() {

    return localStorage.getItem(
        "refresh",
    );

}

export function isAuthenticated() {

    return !!getAccessToken();

}

export function saveCurrentUser(user) {

    if (!user) {

        localStorage.removeItem("currentUser");

        return;

    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user),
    );

}

export function getCurrentUser() {

    const user = localStorage.getItem("currentUser");

    if (!user || user === "undefined") {

        return null;
    }
    try {

        return JSON.parse(user);
    }
    catch {
        return null;
    }

}

export function logout() {
    clearTokens();

    window.location.replace("/");

}

function parseJwt(token) {

    try {

        return JSON.parse(

            atob(token.split(".")[1])

        );

    }

    catch {

        return null;

    }

}