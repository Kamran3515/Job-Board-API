import { isAuthenticated, getCurrentUser, logout } from "../authManager.js";

const footerLogin = document.getElementById("footer-login-item");
const footerRegister = document.getElementById("footer-register-item");
const footerDashboard = document.getElementById("footer-dashboard-item");
const footerDashboardLink = document.getElementById("footer-dashboard-link");
const footerProfile = document.getElementById("footer-profile-item");


export function initializeNavbar() {

    const guestLinks = document.getElementById("guest-links");

    const userMenu = document.getElementById("user-menu");

    if (!guestLinks || !userMenu) { return;}

    if (!isAuthenticated()) {

        guestLinks.classList.remove("d-none");
        userMenu.classList.add("d-none");

        footerLogin?.classList.remove("d-none");
        footerRegister?.classList.remove("d-none");

        footerDashboard?.classList.add("d-none");
        footerProfile?.classList.add("d-none");
        return;
    }

    footerLogin?.classList.add("d-none");
    footerRegister?.classList.add("d-none");

    footerDashboard?.classList.remove("d-none");
    footerProfile?.classList.remove("d-none");

    const user = getCurrentUser();
    
    if (!user) {
        
        guestLinks.classList.remove("d-none");
        userMenu.classList.add("d-none");
        return;
        
    }
    
    guestLinks.classList.add("d-none");
    userMenu.classList.remove("d-none");

    document.getElementById("navbar-username").textContent = user.username;

    const dashboardLink = document.getElementById("dashboard-link");

    switch (user.role) {

        case "EMPLOYER":

            dashboardLink.href =
                "/dashboard/employer/";
            
            dashboardLink.textContent =
                "My Jobs";

            break;

        case "JOB_SEEKER":

            dashboardLink.href =
                "/dashboard/seeker/";

            dashboardLink.textContent =
                "My Applications";

            break;

        default:

            dashboardLink.href = "/";
            dashboardLink.textContent = "Dashboard";

    }
    footerDashboardLink.href = dashboardLink.href;
    document
        .getElementById("logout-btn")
        .onclick = logout;

    setActiveNavLink();

}

function setActiveNavLink() {

    const path = window.location.pathname;

    document
        .querySelectorAll(".navbar .nav-link")
        .forEach(link => {

            link.classList.remove("active");

        });

    if (path === "/") {

        document
            .getElementById('home')
            ?.classList.add("active");

    }

    else if (path.startsWith("/jobs")) {

        document
            .querySelector('a[href="/jobs/"]')
            ?.classList.add("active");

    }

    else if (path.startsWith("/dashboard")) {

        document
            .getElementById("dashboard-link")
            ?.classList.add("active");

    }

    else if (path.startsWith("/profile")) {

        document
            .querySelector('a[href="/profile/"]')
            ?.classList.add("active");

    }

}