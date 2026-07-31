import { loadHomePage } from "./pages/home.js";
import { initializeNavbar } from "./components/navbar.js";
import { isAuthenticated, saveCurrentUser, getCurrentUser, clearTokens,} from "./authManager.js";
import { me } from "./services/auth.js";

async function initializeAuth() {

    if (!isAuthenticated()) {

        clearTokens();
        return;

    }

    const cachedUser = getCurrentUser();

    if (cachedUser) {

        return;

    }

    try {

        const user = await me();

        if (!user) {

            clearTokens();
            return;

        }

        saveCurrentUser(user);

    }

    catch (error) {

        console.error(error);

        clearTokens();

    }

}


document.addEventListener("DOMContentLoaded",

    async () => {
        const path = window.location.pathname;
            
        await initializeAuth();

        initializeNavbar();

        document.querySelector(".navbar")
            .classList.remove("invisible");

        if (path === "/") {

            loadHomePage();

        }

    },

);