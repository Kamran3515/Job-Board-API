import { api } from "../api.js";
import {getMyApplications} from "../services/applications.js";
import {applicationCard} from "../components/applicationCard.js";
import { toast } from "../utils/toast.js";
import { getDashboardStats } from "../services/dashboard.js";
import { dashboardStats } from "../components/dashboard/dashboardStats.js";
import { renderRecentApplications } from "../components/dashboard/recentApplications.js";


const container = document.getElementById("applications-container");

async function loadApplications() {

    try {

        const applications = await getMyApplications();

        applications.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));

        renderApplications(applications);
        document.getElementById("application-count").textContent = applications.length;

    }

    catch (error) {

        toast.error(error)

    }

}

function renderApplications(applications) {

    container.replaceChildren();

    if (applications.length === 0) {

        container.innerHTML = `

            <div class="col-12">
                <div class="alert alert-info">
                    You haven't applied for any jobs yet.
                </div>
            </div>

        `;

        return;

    }

    applications.forEach(application => {

        container.innerHTML += applicationCard(application);

    });

}

async function loadDashboardStats() {

    try {

        const stats = await getDashboardStats();
        const container = document.getElementById("dashboard-stats");

        if (!container) {return;}
        container.innerHTML = dashboardStats(stats);
        renderRecentApplications(stats);
    }

    catch (error) {
        toast.error(error)
    }
}

export async function initializeSeekerDashboard() {

    await loadDashboardStats();

    await loadApplications();

}
initializeSeekerDashboard()