export function applicantCard(application) {

    const snapshot = application.snapshot || {};
    
    return `

    <div class="col-lg-6 mb-4">

        <div class="card applicant-card shadow-sm border-0 h-100">

            <div class="card-body">

                <div class="d-flex justify-content-between align-items-start mb-4">

                    <h4 class="fw-bold mb-1">
                        👤
                        <a
                            href="/profile/${application.applicant_id}"
                            class="text-decoration-none"
                            id="applicant-name">

                            ${snapshot.first_name || ""} ${snapshot.last_name || ""}

                        </a>
                    </h4>

                    <span class="${badgeClass(application.status)}">

                        ${application.status}

                    </span>

                </div>

                <p>
                    <strong>Username:</strong>
                    <small>
                        @${application.applicant_name}
                    </small>
                </p>

                <p>

                    📧 ${snapshot.email || "-"}

                </p>

                <p>

                    📍 ${snapshot.location || "-"}

                </p>

                <p>

                    🛠 Skills:

                </p>

                <div class="mb-3">

                    ${
                        snapshot.skills?.map(skill => `

                            <span class="badge bg-primary me-1">

                                ${skill}

                            </span>

                        `).join("")
                        ||
                        "-"
                    }

                </div>

                <div class="d-flex align-items-center justify-content-between mb-4">

                    <div class="fw-semibold">

                        📄 Resume

                    </div>

                    ${
                        snapshot.resume
                        ? `
                            <a
                                href="${snapshot.resume}"
                                target="_blank"
                                class="btn btn-sm btn-outline-primary">

                                View Resume

                            </a>
                        `
                        : `
                            <span>

                                No Resume

                            </span>
                        `
                    }

                </div>

                <h6>

                    📝 Cover Letter :

                </h6>

                <div class="bg-light rounded p-3 applicant-cover-letter">

                    ${
                        application.cover_letter
                            ? application.cover_letter.replace(/\n/g,"<br>")
                            : "No cover letter"
                    }

                </div>

                ${
                    application.status === "PENDING"

                    ?

                    `

                    <div class="mt-3 d-flex gap-2">

                        <button
                            id="review-${application.id}"
                            class="btn btn-outline-primary review-applicant"

                            data-id="${application.id}">

                            👀 Review

                        </button>

                    </div>

                    `

                    :

                    application.status === "REVIEWED"

                    ?

                    `

                    <div class="mt-3 d-flex gap-2">

                        <button
                            id="accept-${application.id}"
                            class="btn btn-success accept-applicant"

                            data-id="${application.id}">

                            ✅ Accept

                        </button>


                        <button
                            id="reject-${application.id}"
                            class="btn btn-danger reject-applicant"

                            data-id="${application.id}">

                            ❌ Reject

                        </button>

                    </div>

                    `

                    :

                    ""

                    }
            </div>

        </div>

    </div>

    `;

}



function badgeClass(status){

    switch(status){

        case "ACCEPTED":
            return "badge bg-success";

        case "REJECTED":
            return "badge bg-danger";

        case "REVIEWED":
            return "badge bg-info";

        case "PENDING":
            return "badge bg-warning text-dark";

        default:
            return "badge bg-secondary";

    }

}