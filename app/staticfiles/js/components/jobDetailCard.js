export function jobDetailCard(job) {
    
    const skills = job.skills
        .map(skill => `

            <span class="badge bg-primary skill-badge">

                ${skill}

            </span>

        `)
        .join("");

    return `

    <div class="job-header">

        <span class="badge bg-light text-primary mb-3">

            ${job.job_type.replaceAll("_"," ")}

        </span>

        <h1>

            ${job.title}

        </h1>

        <h5 class="mb-3">

            <a href="/companies/${job.company}" class="text-decoration-none">
                🏢 ${job.company_name ?? "Company"}
            </a>

        </h5>

        <div class="job-meta">

            <span>📍 ${job.location}</span>

            <span>💰 ${job.salary_min ?? "-"} - ${job.salary_max ?? "-"}</span>

            <span>🎯 ${job.experience_level}</span>

            <span>🕒 Expires ${job.expires_at}</span>

        </div>

    </div>

    <div class="row">

        <div class="col-lg-8">

            <div class="card job-section">

                <div class="card-header">

                    Description

                </div>

                <div class="card-body">

                    ${job.description}

                </div>

            </div>

            <div class="card job-section">

                <div class="card-header">

                    Requirements

                </div>

                <div class="card-body">

                    <div class="requirement-item">

                        ${job.requirements}

                    </div>

                </div>

            </div>

            <div class="card job-section">

                <div class="card-header">

                    Skills

                </div>

                <div class="card-body">

                    ${skills}

                </div>

            </div>

            <div class="card company-card border-0 shadow-sm rounded-4 mb-4">
                <div class="card-header">
                    <strong>
                        Company
                    </strong>
                </div>
                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-center">

                        <div class="d-flex align-items-center gap-3">

                            <img
                                src="${job.company_logo || "/static/images/company-placeholder.svg"}"
                                width="70"
                                height="70"
                                class="rounded-circle border shadow-sm"
                                style="object-fit:cover;"
                            >

                            <div>

                                <h5 class="mb-1 fw-bold">

                                    ${job.company_name}

                                </h5>

                                <div class="small">

                                    <i class="bi bi-geo-alt-fill me-1"></i>

                                    ${job.company_location}

                                </div>

                            </div>

                        </div>

                        <a
                            href="/companies/${job.company}"
                            class="btn btn-primary rounded-pill px-4">

                            <i class="bi bi-building me-2"></i>

                            View Company

                        </a>

                    </div>

                </div>

            </div>

        </div>

        <div class="col-lg-4">

            <div class="job-sidebar">

                <div class="card">

                    <div class="card-body">

                        <h5 class="mb-4">

                            Job Summary

                        </h5>

                        <p>

                            <strong>📍 Location</strong><br>

                            ${job.location}

                        </p>

                        <p>

                            <strong>💰 Salary</strong><br>

                            ${job.salary_min ?? "-"} - ${job.salary_max ?? "-"}

                        </p>

                        <p>

                            <strong>🎯 Experience</strong><br>

                            ${job.experience_level}

                        </p>

                        <button

                            id="apply-btn"

                            class="btn btn-success btn-lg w-100 btn-apply">

                            Apply Now

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

    `;

}