import { login, me } from "../services/auth.js";
import { saveTokens, saveCurrentUser} from "../authManager.js";
import { api } from "../api.js";
import { toast } from "../utils/toast.js";

const form = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

if (form) {

    form.addEventListener("submit", submitLogin);

}

async function submitLogin(event) {

    event.preventDefault();

    loginBtn.disabled = true;

    loginBtn.innerHTML = `

        <span
        class="spinner-border spinner-border-sm me-2">
        </span>

        Logging in...

    `;

    try {

        const response = await login({

            email: emailInput.value.trim(),
            password: passwordInput.value,

        });

        saveTokens(response.access, response.refresh);

        const user = await me();

        saveCurrentUser(user);

        toast.success("Welcome back!");

        setTimeout(() => {

            if (user.role === "EMPLOYER") {

                window.location = "/dashboard/employer/";
            }
            else {
                window.location = "/dashboard/seeker/";
            }

        }, 700);

    }

    catch (error) {

        toast.error(error);
        
    }

    finally {

        loginBtn.disabled = false;

        loginBtn.textContent = "Login";

    }

}

setupPasswordToggle("password", "toggle-password");

function setupPasswordToggle(inputId, buttonId) {

    const input = document.getElementById(inputId);

    const button = document.getElementById(buttonId);

    button.addEventListener("click", () => {

        if (input.type === "password") {

            input.type = "text";
            button.textContent = "🙈";
        }
        else {
            input.type = "password";
            button.textContent = "👁";
        }
    });
}