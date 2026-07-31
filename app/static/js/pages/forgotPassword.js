import { forgotPassword } from "../services/password.js";
import { api } from "../api.js";
import { toast } from "../utils/toast.js";

const form = document.getElementById("forgot-password-form");
const emailInput = document.getElementById("email");

form.addEventListener(
    "submit",
    submitForgotPassword,
);

async function submitForgotPassword(event) {

    event.preventDefault();

    try {

        const response = await forgotPassword(

            emailInput.value.trim(),

        );

        toast.success(response.detail)

        form.reset();

    }

    catch (error) {

        toast.error(error)

    }

}