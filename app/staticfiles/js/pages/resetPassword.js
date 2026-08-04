import { resetPassword } from "../services/password.js";
import { api } from "../api.js";
import { toast } from "../utils/toast.js";

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

                confirm_password: confirmPassword.value,

            },

        );

        toast.success(response.detail)

        form.reset();

        setTimeout(

            () => {

                window.location.href = "/login/";

            },

            2000,

        );

    }

    catch (error) {

        toast.error(error||"something went wrong")

    }

}