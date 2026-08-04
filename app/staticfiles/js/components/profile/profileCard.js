export function profileCard(profile) {

    return `

    <div class="card shadow-lg border-0 rounded-4 overflow-hidden">

        <div class="bg-primary text-white p-5">

            <div class="d-flex justify-content-between align-items-start flex-wrap">

                <div class="d-flex align-items-center gap-4 flex-wrap">

                    <div class="position-relative">

                        <img
                            id="avatar-preview"
                            src="${profile.avatar ?? "/static/images/images.jpg"}"
                            class="rounded-circle border border-4 border-white shadow"
                            width="160"
                            height="160"
                            style="object-fit:cover;"
                        >

                        <label
                            id="avatar-upload-label"
                            for="avatar"
                            class="avatar-upload-btn position-absolute bottom-0 end-0 d-none">

                            <i class="bi bi-camera-fill"></i>

                        </label>

                        <input
                            id="avatar"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            class="d-none">

                    </div>

                    <div>

                        <h2 class="fw-bold mb-1">

                            ${profile.first_name ?? ""}
                            ${profile.last_name ?? ""}

                        </h2>

                        <h5 class="opacity-75">

                            @${profile.username}

                        </h5>

                        <p class="mb-2">

                            ${profile.email}

                        </p>

                        <span class="badge bg-light text-dark px-3 py-2">

                            ${profile.role}

                        </span>

                    </div>

                </div>

                <button
                    id="edit-profile-btn"
                    class="btn btn-light rounded-pill">

                    <i class="bi bi-pencil-square me-2"></i>

                    Edit Profile

                </button>

            </div>

        </div>

        <div class="card-body p-4">

            <form id="profile-form">

                <div class="card border-0 shadow-sm rounded-4 mb-4">

                    <div class="card-header  fw-bold fs-5">

                        👤 Basic Information

                    </div>

                    <div class="card-body">

                        <div class="row">

                            <div class="col-md-6 mb-3">

                                <label class="form-label fw-semibold">

                                    First Name

                                </label>

                                <input
                                    id="first_name"
                                    class="form-control"
                                    value="${profile.first_name ?? ""}"
                                    readonly>

                            </div>

                            <div class="col-md-6 mb-3">

                                <label class="form-label fw-semibold">

                                    Last Name

                                </label>

                                <input
                                    id="last_name"
                                    class="form-control"
                                    value="${profile.last_name ?? ""}"
                                    readonly>

                            </div>

                            <div class="col-md-6 mb-3">

                                <label class="form-label fw-semibold">

                                    Phone

                                </label>

                                <input
                                    id="phone"
                                    class="form-control"
                                    value="${profile.phone ?? ""}"
                                    readonly>

                            </div>

                            <div class="col-md-6 mb-3">

                                <label class="form-label fw-semibold">

                                    Location

                                </label>

                                <input
                                    id="location"
                                    class="form-control"
                                    value="${profile.location ?? ""}"
                                    readonly>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="card border-0 shadow-sm rounded-4 mb-4">

                    <div class="card-header  fw-bold fs-5">
                        💡 Skills
                    </div>

                    <div class="card-body">

                        <div id="skills-container" ></div>

                    </div>

                </div>

                <div class="card border-0 shadow-sm rounded-4 mb-4">

                    <div class="card-header  fw-bold fs-5">

                        👨 About Me

                    </div>

                    <div class="card-body">

                        <textarea
                            id="bio"
                            class="form-control border-0"
                            rows="5"
                            readonly>${profile.bio ?? ""}</textarea>

                    </div>

                </div>

                <div class="card border-0 shadow-sm rounded-4 mb-4">

                    <div class="card-header  fw-bold fs-5">

                        🌐 Social Links

                    </div>

                    <div class="card-body">

                        <div class="row">

                            <div class="col-md-4 mb-3">

                                <label class="form-label">

                                    GitHub

                                </label>

                                <input

                                    id="github"

                                    class="form-control"

                                    value="${profile.github ?? ""}"

                                    readonly>

                            </div>

                            <div class="col-md-4 mb-3">

                                <label class="form-label">

                                    LinkedIn

                                </label>

                                <input

                                    id="linkedin"

                                    class="form-control"

                                    value="${profile.linkedin ?? ""}"

                                    readonly>

                            </div>

                            <div class="col-md-4 mb-3">

                                <label class="form-label">

                                    Website

                                </label>

                                <input

                                    id="website"

                                    class="form-control"

                                    value="${profile.website ?? ""}"

                                    readonly>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="card border-0 shadow-sm rounded-4 mb-4">

                    <div class="card-header  fw-bold fs-5">

                        📄 Resume

                    </div>

                    <div class="card-body">

                        <div class="d-flex justify-content-between align-items-center mb-3">

                            <div>

                                <h6 class="mb-1">

                                    Current Resume

                                </h6>

                                <small class="text-muted">

                                    PDF

                                </small>

                            </div>

                            ${
                                profile.resume

                                    ?

                                    `

                                    <a

                                        href="${profile.resume}"

                                        target="_blank"

                                        class="btn btn-outline-primary">

                                        View Resume

                                    </a>

                                    `

                                    :

                                    `

                                    <span class="badge bg-secondary">

                                        No Resume

                                    </span>

                                    `
                            }

                        </div>

                        <label

                            id="resume-upload-label"

                            for="resume"

                            class="btn btn-outline-success w-100 d-none">

                            <i class="bi bi-upload me-2"></i>

                            Replace Resume

                        </label>

                        <input

                            id="resume"

                            type="file"

                            accept=".pdf"

                            class="d-none">

                    <small

                        id="resume-file-name"

                        class="d-block mt-3 text-center">

                    </small>

                    </div>

                </div>

                <button

                    id="save-profile-btn"

                    class="btn btn-primary btn-lg w-100 d-none">

                    <i class="bi bi-check-circle me-2"></i>

                    Save Changes

                </button>

            </form>

        </div>

    </div>

    `;

}