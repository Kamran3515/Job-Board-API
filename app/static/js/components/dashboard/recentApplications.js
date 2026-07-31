import { timeAgo } from "../../utils/time.js";
function getBadge(status) {

    switch (status) {

        case "PENDING":

            return "bg-warning text-dark";

        case "ACCEPTED":

            return "bg-success";

        case "REJECTED":

            return "bg-danger";

        default:

            return "bg-secondary";

    }

}

export function renderRecentApplications(stats) {

    const container =
        document.getElementById(
            "recent-applications",
        );

    if (!container) return;

    container.innerHTML = "";

    if (

        !stats.recent_applications ||

        stats.recent_applications.length === 0

    ) {

        container.innerHTML = `

            <div class="list-group-item text-center text-muted py-4">

                No applications yet.

            </div>

        `;

        return;

    }

    stats.recent_applications.forEach(application => {
        
        container.innerHTML += `

        <div class="list-group-item py-3">

            <div class="d-flex justify-content-between align-items-start">

                <div>

                    <div class="fw-semibold">

                        ${application.job}

                    </div>

                    <div class="mt-2">

                        <span class="badge ${getBadge(application.status)}">

                            ${application.status}

                        </span>

                    </div>

                </div>

                <div class="text-end">

                    <small class="text-muted">

                        ${timeAgo(application.applied_at)}

                    </small>

                </div>

            </div>

        </div>

        `;

    });

}