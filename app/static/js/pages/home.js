import { getJobs } from "../services/jobs.js";
import { jobCard } from "../components/jobCard.js";
import { toast } from "../utils/toast.js";
import { api } from "../api.js";
import { getHomeStats } from "../services/home.js";
import { getCurrentUser } from "../authManager.js";
import { animateCards } from "../utils/animation.js";

const container = document.getElementById("jobs-container");
const ctaBtn = document.getElementById("cta-btn");
const user = getCurrentUser();

if (window.location.pathname === "/"){
    if (user) {
        
        if (user.role === "EMPLOYER") {
            ctaBtn.href = "/dashboard/employer/";
            ctaBtn.textContent = "Go to Dashboard";

        } else {

            ctaBtn.href = "/dashboard/seeker/";
            ctaBtn.textContent = "Go to Dashboard";

        }

    }
}
async function loadStats(){

    const stats = await getHomeStats();

    document.getElementById("jobs-count").textContent =
        stats.jobs;

    document.getElementById("companies-count").textContent =
        stats.companies;

    document.getElementById("applications-count").textContent =
        stats.applications;

}

async function renderJobs(data) {

    if(data.results.length===0){

        container.innerHTML=`

            <div class="col-12">

                <div class="card border-0 shadow-sm text-center p-5">

                    <h3>

                        😔

                    </h3>

                    <h4>

                        No jobs found

                    </h4>

                    <p class="text-muted">

                        Try another keyword.

                    </p>

                </div>

            </div>

        `;

        return;

    }

    container.innerHTML = "";

    data.results.forEach(job => {

        container.innerHTML += jobCard(job);

    });
}

export async function loadHomePage() {

    try {

        const jobs = await getJobs();

        renderJobs(jobs);
        await loadStats();
        animateCards();

    }

    catch (error) {

        toast.error(error);

        return;

    }

    const searchBtn = document.getElementById("search-btn");
    const searchInp = document.getElementById("search-input")
    if (!searchBtn) return;

    searchBtn.addEventListener(
        "click",
        async () => {

            const keyword = document.getElementById("search-input").value;
            const jobs = await getJobs({search: keyword});

            renderJobs(jobs);

        }
    );
    searchInp.addEventListener(
        "keydown",
        async (e) => {
            if (e.key === "Enter"){
                
                const keyword = document.getElementById("search-input").value;
                const jobs = await getJobs({search: keyword});

                renderJobs(jobs);
            }

        }
    );
}

