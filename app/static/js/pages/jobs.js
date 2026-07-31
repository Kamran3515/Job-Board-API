import { api } from "../api.js";
import { getJobs } from "../services/jobs.js";
import { jobCard } from "../components/jobCard.js";
import { loadingState, emptyState, errorState } from "../components/states.js";
import { debounce } from "../utils/debounce.js";
import { animateCards } from "../utils/animation.js";

const container = document.getElementById("jobs-container");
const pagination = document.getElementById("pagination"); 
const clearBtn = document.getElementById("clear-filters-btn");
let currentFilters = {};
let currentPage = 1;
const PAGE_SIZE = 9;
const MAX_VISIBLE_PAGES = 5;


function getFilters() {

    return {

        search: document.getElementById("search-input").value.trim(),

        job_type: document.getElementById("job-type-filter")?.value || "",

        experience_level:
            document.getElementById("experience-filter")?.value || "",

        ordering:
            document.getElementById("ordering-filter")?.value || "",

        location:
            document.getElementById("location-filter")?.value.trim() || "",

        salary_min:
            document.getElementById("salary-filter")?.value || "",

    };

}

function clearFilters() {

    document.getElementById("search-input").value = "";
    document.getElementById("location-filter").value = "";
    document.getElementById("job-type-filter").value = "";
    document.getElementById("experience-filter").value = "";
    document.getElementById("ordering-filter").value = "-created_at";
    document.getElementById("salary-filter").value = "";
}

function bindEmptyStateActions() {

    clearBtn?.addEventListener("click", () => {

            clearFilters();

            loadJobs(getFilters(), 1);

        });

}

async function loadJobs(filters = {}, page =1) {

    currentFilters = filters;
    currentPage = page;

    container.innerHTML = loadingState();

    pagination.innerHTML = "";

    try {

        const data = await getJobs({

            ...filters,

            page,

        });

        renderJobs(data);
        animateCards();

    }

    catch (error) {

        container.innerHTML = errorState(

            api.normalizeError(error)

        );

    }

    window.scrollTo({top: 0, behavior: "smooth"});

}

loadJobs();

function renderJobs(data) {

    container.innerHTML = "";

    if (data.results.length === 0) {

        container.innerHTML = emptyState(currentFilters.search);
        pagination.innerHTML = "";

        return;

    }

    data.results.forEach(job => {

        container.innerHTML += jobCard(job);

    });

    renderPagination(data);

}


const searchJobs = debounce(() => {

    loadJobs(getFilters(), 1);

}, 400);

document.getElementById("search-input")
    ?.addEventListener("input", searchJobs);

document.getElementById("location-filter")
    ?.addEventListener("input", searchJobs);


[
    "ordering-filter",
    "job-type-filter",
    "experience-filter",
    "salary-filter",
].forEach(id => {

    document.getElementById(id)
        ?.addEventListener("change",() => {

                loadJobs(getFilters(), 1);
            },
        );
});

function renderPagination(data) {

    pagination.innerHTML = "";

    const totalPages = Math.ceil(data.count / PAGE_SIZE);

    if (totalPages <= 1) {return;}

    let html = `

        <nav>

            <ul class="pagination justify-content-center mt-4">

    `;

    html += `

        <li class="page-item ${!data.previous ? "disabled" : ""}">

            <button
                class="page-link"
                id="prev-page">

                ← 

            </button>

        </li>

    `;

    const start = Math.max(1,currentPage - 2);

    const end = Math.min(totalPages,currentPage + 2);

    if (start > 1) {

        html += `

            <li class="page-item">

                <button
                    class="page-link page-number"
                    data-page="1">

                    1

                </button>

            </li>

        `;

        if (start > 2) {

            html += `

                <li class="page-item disabled">

                    <span class="page-link">

                        ...

                    </span>

                </li>

            `;

        }

    }

    for (let page = start; page <= end; page++) {

        html += `

            <li
                class="page-item ${page === currentPage ? "active" : ""}">

                <button
                    class="page-link page-number"
                    data-page="${page}">

                    ${page}

                </button>

            </li>

        `;

    }

    if (end < totalPages) {

        if (end < totalPages - 1) {

            html += `

                <li class="page-item disabled">

                    <span class="page-link">

                        ...

                    </span>

                </li>

            `;

        }

        html += `

            <li class="page-item">

                <button
                    class="page-link page-number"
                    data-page="${totalPages}">

                    ${totalPages}

                </button>

            </li>

        `;

    }

    html += `

        <li class="page-item ${!data.next ? "disabled" : ""}">

            <button
                class="page-link"
                id="next-page">

                 →

            </button>

        </li>

    `;

    html += `

            </ul>

        </nav>

    `;

    pagination.innerHTML = html;

    document.querySelectorAll(".page-number")
        .forEach(button => {

            button.addEventListener(
                "click",

                () => {

                    loadJobs(

                        currentFilters,

                        Number(button.dataset.page),

                    );

                },

            );

        });

    document.getElementById("prev-page")
        ?.addEventListener(

            "click",

            () => {

                if (data.previous) {

                    loadJobs(currentFilters, currentPage - 1);
                }
            },
        );

    document.getElementById("next-page")
        ?.addEventListener(

            "click",

            () => {

                if (data.next) {

                    loadJobs(currentFilters, currentPage + 1);

                }
            },
        );
}

document.addEventListener("click", (e) => {

    if (e.target.id !== "clear-filters-btn") return;

    clearFilters();

    loadJobs(getFilters(), 1);

});