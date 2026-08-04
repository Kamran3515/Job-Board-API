export function renderCompany(company){
    
        return `

            <section class="mb-5">

                <div class="card border-0 shadow rounded-4 overflow-hidden">

                    <div class="card-body p-5">

                        <div class="row align-items-center">

                            <div class="col-lg-2 text-center mb-4 mb-lg-0">

                                <img
                                    src="${
                                        company.logo ||
                                        "/static/images/company-placeholder.svg"
                                    }"

                                    class="rounded-circle border border-3 shadow"

                                    width="140"
                                    height="140"

                                    style="object-fit:cover;"
                                >

                            </div>

                            <div class="col-lg-7">

                                <h1 class="fw-bold mb-3">

                                    ${company.name}

                                </h1>

                                <p class="location mb-2">

                                    <i class="bi bi-geo-alt-fill me-2"></i>

                                    ${company.location}

                                </p>

                                <p class="mb-3">

                                    <i class="bi bi-globe me-2"></i>

                                    <a
                                        href="${company.website}"
                                        target="_blank"
                                        class="text-decoration-none">

                                        ${company.website}

                                    </a>

                                </p>

                                <p class="text-secondary">

                                    ${company.description}

                                </p>

                            </div>

                            <div class="col-lg-3 text-lg-end">

                                <div class="d-grid gap-3">

                                    <a
                                        href="${company.website}"
                                        target="_blank"
                                        class="btn btn-primary rounded-pill">

                                        <i class="bi bi-box-arrow-up-right me-2"></i>

                                        Visit Website

                                    </a>

                                    ${
                                        company.is_owner
                                        ? `
                                        <button
                                            id="edit-company-btn"
                                            class="btn btn-outline-primary rounded-pill">

                                            <i class="bi bi-pencil-square me-2"></i>

                                            Edit Company

                                        </button>
                                        `
                                        : ""
                                    }

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
            <section id="company-jobs" class="row">

                <div class="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 class="fw-bold">

                            Open Positions

                        </h2>

                        <small>

                            ${company.jobs.length} Active Jobs

                        </small>

                    </div>

                </div>
                                    
            </section>`;

    

}