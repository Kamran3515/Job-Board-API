import { timeAgo } from "../utils/time.js";

export function applicationCard(application) {

    return `

        <div class="col-lg-6 mb-4">

            <div class="card application-card h-100">

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-start mb-3">

                        <div>

                            <h4 class="fw-bold mb-1">

                                ${application.job_title}

                            </h4>

                            <div class="text-muted">

                                🏢 ${application.company_name}

                            </div>

                        </div>

                        <span class="${badgeClass(application.status)}">

                            ${application.status}

                        </span>

                    </div>

                    <hr>

                    <div class="mb-4">

                        <small class="text-muted">

                            🕒 Applied

                        </small>

                        <div class="fw-semibold">

                            ${timeAgo(application.applied_at)}

                        </div>

                    </div>

                    <a
                        href="/jobs/${application.job}/"
                        class="btn btn-primary w-100">

                        👁 View Job

                    </a>

                </div>

            </div>

        </div>

    `;
}

function badgeClass(status){

    switch(status){

        case "ACCEPTED":
            return "badge bg-success rounded-pill px-3 py-2";

        case "REJECTED":
            return "badge bg-danger rounded-pill px-3 py-2";

        case "REVIEWED":
            return "badge bg-info rounded-pill px-3 py-2";

        default:
            return "badge bg-warning text-dark rounded-pill px-3 py-2";

    }

}