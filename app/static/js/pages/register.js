import { api } from "../api.js";
import { register } from "../services/auth.js";
import { toast } from "../utils/toast.js";

const form =document.getElementById("register-form");
const registerBtn =document.getElementById("register-btn");
form.addEventListener("submit",submitRegister,);

async function submitRegister(e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirm-password").value;

    const role = document.querySelector('input[name="role"]:checked').value;

    if (password !== confirmPassword) {

        toast.warning("Passwords do not match.")

        return;

    }

    try {

        registerBtn.disabled = true;

        registerBtn.innerHTML = `

            <span
                class="spinner-border spinner-border-sm me-2">
            </span>

            Creating Account...

        `;

        await register({username,email,password,role,});

        toast.success("Account created successfully.")

        setTimeout(() => {

            window.location = "/login/";

        }, 1200);

    }

    catch (error) {

        if (typeof error === "object") {
 
            toast.error(error)
        }
        else {

            toast.error("Something went wrong.")
        }
    }

    finally {

        registerBtn.disabled = false;
        registerBtn.textContent ="Register";
    }

}

setupPasswordToggle("password","toggle-password",);
setupPasswordToggle("confirm-password","toggle-confirm-password",);

function setupPasswordToggle(inputId,buttonId) {

    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    button.addEventListener(

        "click",

        () => {

            if (input.type === "password") {

                input.type = "text";
                button.textContent = "🙈";
            }
            else {

                input.type = "password";
                button.textContent = "👁";
            }
        },
    );
}