import { timeAgo } from "../../utils/time.js";

export function renderRecentJobs(stats) {

    const container =
        document.getElementById(
            "recent-jobs",
        );

    if (!container) return;

    container.innerHTML = "";

    if (
        !stats.recent_jobs ||
        stats.recent_jobs.length === 0
    ) {

        container.innerHTML = `

            <div class="list-group-item text-center text-muted py-4">

                No jobs yet.

            </div>

        `;

        return;

    }

    stats.recent_jobs.forEach(job => {

        container.innerHTML += `

        <div class="list-group-item py-3">

            <div class="d-flex justify-content-between align-items-start">

                <div>

                    <div class="fw-semibold fs-6">

                        ${job.title}

                    </div>

                    <div class="text-muted small mt-1">

                        🏢 ${job.company}

                    </div>

                </div>

                <div class="text-end">

                    ${
                        job.job_type
                            ? `<span class="badge bg-primary rounded-pill">${job.job_type.replaceAll("_"," ")}</span>`
                            : ""
                    }

                    <div class="small text-muted mt-2">

                        ${timeAgo(job.created_at)}

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}