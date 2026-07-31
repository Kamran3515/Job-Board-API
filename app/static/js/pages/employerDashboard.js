import { api } from "../api.js";
import { getMyJobs } from "../services/jobs.js";
import { getMyCompanies } from "../services/companies.js";
import { getDashboardStats } from "../services/dashboard.js";
import { dashboardJobCard } from "../components/dashboardJobCard.js";
import { renderRecentJobs } from "../components/dashboard/recentJobs.js";
import { renderRecentApplications } from "../components/dashboard/recentApplications.js";
import { initializeJobModal, openEditModal } from "../components/jobModalManager.js";
import { initializeCompanyModal } from "../components/companyModalManager.js";
import { initializeDeleteModal, openDeleteModal } from "../components/deleteJobManager.js";
import { dashboardStats } from "../components/dashboard/dashboardStats.js";
import { toast } from "../utils/toast.js";

const container = document.getElementById("jobs-container");

let myCompanies = [];
let myJobs = [];

async function loadJobs() {
    try {
        myJobs = await getMyJobs();

        container.innerHTML = "";
        myJobs.forEach(job => { container.innerHTML += dashboardJobCard(job); });
        document
            .querySelectorAll(".edit-job")
                .forEach(button => {

                    button.addEventListener(

                        "click",

                        () => {
                            const id = Number(button.dataset.id);
                            openEditModal(id);
                        },
                    );
                });
        document
            .querySelectorAll(".delete-job")
                .forEach(button => {

                    button.addEventListener(

                        "click",

                        () => {

                            openDeleteModal(
                                Number(button.dataset.id)
                            );
                        },
                    );
                });
    }
    catch (error) {
        toast.error(error)
    }
}

async function loadCompanies() {

    myCompanies = await getMyCompanies();

    const select = document.getElementById("company");

    select.innerHTML = "";

    myCompanies.forEach(company => {

        select.innerHTML += `

            <option value="${company.id}">
                ${company.name}
            </option>
            
        `;
    });

}

function updateCreateButton() {

    const button = document.getElementById("create-job-btn");
    const emptyState = document.getElementById("empty-company-state");
    const jobsContainer = document.getElementById("jobs-container");

    if (myCompanies.length === 0) {

        button.disabled = true;
        button.classList.replace("btn-primary", "btn-secondary");
        emptyState.classList.remove("d-none");
        jobsContainer.classList.add("d-none");
    }
    else {
        button.disabled = false;
        button.classList.replace("btn-secondary", "btn-primary");
        emptyState.classList.add("d-none");
        jobsContainer.classList.remove("d-none");
    }

}

async function loadDashboardStats() {

    try {

        const stats = await getDashboardStats();
        const container = document.getElementById("dashboard-stats");

        if (container) {

            container.innerHTML = dashboardStats(stats);

        }

        renderRecentJobs(stats);

        renderRecentApplications(stats);

    }

    catch (error) {

        toast.error(error);
    }
}

async function init() {

    initializeJobModal({

        getJobs: () => myJobs,
        onSuccess: loadJobs,

    });

    initializeDeleteModal({

        getJobs: () => myJobs,
        onSuccess: loadJobs,

    });

    initializeCompanyModal({

        onSuccess: async () => {

            await loadCompanies();
            updateCreateButton();
            await loadJobs();

        },

    });
    await loadCompanies();

    updateCreateButton();

    await loadDashboardStats();

    await loadJobs();

}

init();