export function dashboardJobCard(job) {
    console.log(job)

    return `

        <div class="col-lg-6 mb-4">

            <div class="card dashboard-job-card h-100">

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-start mb-3">

                        <div>

                            <h4 class="fw-bold mb-1">

                                ${job.title}

                            </h4>

                            <div class="text-muted">

                                🏢 ${job.company_name ?? ""}

                            </div>

                        </div>

                        <span class="badge bg-primary rounded-pill px-3 py-2">

                            ${job.job_type.replaceAll("_"," ")}

                        </span>

                    </div>

                    <hr>

                    <div class="row text-muted small mb-3">

                        <div class="col-6">

                            📍 ${job.location}

                        </div>

                        <div class="col-6 text-end">

                            👥 ${job.applications_count ?? 0} Applicants

                        </div>

                    </div>

                    <hr>
                    
                    <div class="dashboard-job-actions">

                        <div class="d-flex gap-2 mb-2">

                            <a
                                href="/jobs/${job.id}/"
                                class="btn btn-primary">

                                👁 View

                            </a>

                            <a
                                href="/dashboard/employer/jobs/${job.id}/applicants/"
                                class="btn btn-success">

                                👥 Applicants

                            </a>

                        </div>

                        <div class="d-flex gap-2">

                            <button
                                class="btn btn-warning edit-job"
                                data-id="${job.id}">

                                ✏ Edit

                            </button>

                            <button
                                class="btn btn-danger delete-job"
                                data-id="${job.id}">

                                🗑 Delete

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;

}