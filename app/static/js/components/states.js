export function loadingState(count = 6) {

    let html = "";

    for (let i = 0; i < count; i++) {

        html += `

            <div class="col-md-4 mb-4">

                <div class="card shadow-sm border-0 h-100">

                    <div class="card-body">

                        <div class="placeholder-glow">

                            <span class="placeholder col-4 mb-3"></span>

                            <h5>

                                <span class="placeholder col-9"></span>

                            </h5>

                            <p>

                                <span class="placeholder col-12"></span>

                                <span class="placeholder col-10"></span>

                            </p>

                            <div class="mb-2">

                                <span class="placeholder col-5"></span>

                            </div>

                            <div class="mb-3">

                                <span class="placeholder col-4"></span>

                            </div>

                            <span
                                class="placeholder col-3 rounded-pill">
                            </span>

                        </div>

                    </div>

                </div>
            </div>

        `;

    }

    return html;

}

export function emptyState(search = "") {

    return `

        <div class="col-12">

            <div class="card shadow-sm border-0">

                <div class="card-body text-center py-5">

                    <h3 class="mb-3">

                        🔍 No jobs found

                    </h3>

                    <p class="text-muted">

                        Try changing your search or filters.

                    </p>

                    ${search ? ` <p class="fw-bold">"${search}"</p>` : ""}

                    <button
                        class="btn btn-outline-primary mt-3"
                        id="clear-filters-btn"
                    >

                        Clear Filters

                    </button>

                </div>

            </div>

        </div>

    `;

}

export function errorState(message = "Something went wrong") {

    return `

        <div class="col-12">

            <div class="card border-0 shadow-sm">

                <div class="card-body text-center py-5">

                    <h2 class="display-5 mb-3">

                        ⚠️

                    </h2>

                    <h4 class="fw-bold">

                        Oops!

                    </h4>

                    <p class="text-muted">

                        ${message}

                    </p>

                    <button

                        class="btn btn-primary"

                        id="retry-btn">

                        Retry

                    </button>

                </div>

            </div>

        </div>

    `;

}