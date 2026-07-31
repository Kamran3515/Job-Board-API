import { resetPassword } from "../services/password.js";
import { api } from "../api.js";
import { showToast } from "../components/toast.js";

const form = document.getElementById(
    "reset-password-form",
);

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirm_password");

const params = new URLSearchParams(
    window.location.search,
);

const uid = params.get("uid");

const token = params.get("token");

form.addEventListener(
    "submit",
    submitResetPassword,
);

async function submitResetPassword(event) {

    event.preventDefault();

    if (!uid || !token) {

        showToast(

            "Invalid reset link.",

            "danger",

        );

        return;

    }

    try {

        const response = await resetPassword(

            {

                uid,

                token,

                password: password.value,

                confirm_password:رconfirmPassword.value,

            },

        );

        showToast(

            response.detail,

            "success",

        );

        form.reset();

        setTimeout(

            () => {

                window.location.href = "/login/";

            },

            2000,

        );

    }

    catch (error) {

        showToast(

            api.normalizeError(error),

            "danger",

        );

    }

}