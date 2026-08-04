import { getCompany } from "../services/companies.js";
import { renderCompany } from "../components/companyDetail.js";
import { jobCard } from "../components/jobCard.js";
import { openEditCompanyModal } from "../components/companyModalManager.js";
import { initializeCompanyModal } from "../components/companyModalManager.js";
import { animateCards } from "../utils/animation.js";

initializeCompanyModal({
    onSuccess: async () => {
        location.reload();
    }
});

const companyId = window.location.pathname.split("/").filter(Boolean).pop();
const container = document.getElementById("company-container");


(async ()=>{
 
    const company = await getCompany(companyId);

    container.innerHTML = renderCompany(company);

    if(company.is_owner){

        document
            .getElementById("edit-company-btn")
            ?.addEventListener("click",()=>{

                openEditCompanyModal(company);

            });

    }

    const jobsContainer = document.getElementById("company-jobs");

    if (company.jobs.length === 0) {

        jobsContainer.innerHTML = `
            <div class="col-12">

                <div class="text-center py-5">

                    <i class="bi bi-briefcase fs-1 text-secondary"></i>

                    <h4 class="mt-3">

                        No Open Positions

                    </h4>

                    <p>

                        This company has no active jobs.

                    </p>

                </div>

            </div>
        `;

    }
    else {

        company.jobs.forEach(job => {
            
            jobsContainer.innerHTML += jobCard(job);

        });

        animateCards(".job-card")

    }
    
})();