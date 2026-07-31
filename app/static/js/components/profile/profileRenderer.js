import { updateProfile, getSkills } from "../../services/profile.js";
import { profileCard } from "./profileCard.js";
import { state } from "./profileState.js";
import { initializePreview } from "./profilePreview.js";
import { initializeProfileEvents } from "./profileEvents.js";
import { disableEditMode } from "./profileEditor.js";
import { api } from "../../api.js";
import { toast } from "../../utils/toast.js";


export function renderProfile(profile, isOwner = true) {

    const container = document.getElementById("profile-container");

    container.innerHTML = profileCard(profile);

    initializeProfile(profile, isOwner);

}

export async function renderSkills(profile, editable = false) {

    const container = document.getElementById("skills-container");

    const skills = await getSkills();

    if (!editable) {

        if (!profile.skills?.length) {

            container.innerHTML = `
                <span class="text-muted">
                    No skills added.
                </span>
            `;

            return;
        }

        container.innerHTML = profile.skills
            .map(skill => `
                <span class="badge bg-primary me-2 mb-2 px-3 py-2">
                    ${skill}
                </span>
            `)
            .join("");

        return;
    }

    container.innerHTML = `

        <input
            id="skill-search"
            type="text"
            class="form-control mb-3"
            placeholder="Search skill...">

        <div
            id="skills-list"
            style="max-height:250px; overflow-y:auto;">
        </div>

    `;

    const list = document.getElementById("skills-list");

    function renderList(filter = "") {

        list.innerHTML = skills.results
            .filter(skill =>
                skill.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(skill => `

                <div class="form-check mb-2">

                    <input
                        class="form-check-input profile-skill"
                        type="checkbox"
                        value="${skill.name}"
                        id="skill-${skill.id}"
                        ${profile.skills.includes(skill.name) ? "checked" : ""}>

                    <label
                        class="form-check-label"
                        for="skill-${skill.id}">

                        ${skill.name}

                    </label>

                </div>

            `)
            .join("");
    }

    renderList();

    document
        .getElementById("skill-search")
        .addEventListener("input", e => {

            renderList(e.target.value);

        });

}

function initializeProfile(profile, isOwner) {
    
    state.profile = profile;
    state.isOwner = isOwner;

    state.form = document.getElementById("profile-form");

    state.saveBtn = document.getElementById("save-profile-btn");

    state.editBtn = document.getElementById("edit-profile-btn");

    state.avatar = document.getElementById("avatar");

    state.avatarLabel = document.getElementById("avatar-upload-label");

    state.avatarPreview = document.getElementById("avatar-preview");

    state.resume = document.getElementById("resume");

    state.resumeFileName = document.getElementById("resume-file-name");

    state.firstName = document.getElementById("first_name");

    state.lastName = document.getElementById("last_name");

    state.phone = document.getElementById("phone");

    state.location = document.getElementById("location");

    state.bio = document.getElementById("bio");

    state.github = document.getElementById("github");

    state.linkedin = document.getElementById("linkedin");

    state.website = document.getElementById("website");

    renderSkills(profile);

    if (isOwner) {

        initializePreview();

        initializeProfileEvents(submitProfile);

        disableEditMode();

    }
    else {

        state.editBtn.remove();

    }

}

function collectProfileData() {

    const formData = new FormData();
    formData.append("first_name", state.firstName.value.trim());
    formData.append("last_name", state.lastName.value.trim());
    formData.append("phone", state.phone.value.trim());
    formData.append("location", state.location.value.trim());
    formData.append("bio", state.bio.value.trim());
    formData.append("github", state.github.value.trim());
    formData.append("linkedin", state.linkedin.value.trim());
    formData.append("website", state.website.value.trim());

    if (state.avatar.files.length > 0) {

        formData.append("avatar", state.avatar.files[0]);
    }

    if (state.resume.files.length > 0) {

        formData.append("resume", state.resume.files[0]);
    }

    document.querySelectorAll(".profile-skill:checked")
        .forEach(skill => {
            formData.append("skills",skill.value);
        });

    return formData;
}

async function submitProfile(e) {

    e.preventDefault();

    try {

        setLoading(true)

        const formData = collectProfileData();

        const profile = await updateProfile(formData);

        toast.success("Profile updated successfully.")

        renderProfile(profile, true);

    }

    catch (error) {

        toast.error(error)
    }

    finally {

        setLoading(false)
    }

}

function setLoading(isLoading) {

    state.saveBtn.disabled = isLoading;

    state.saveBtn.innerHTML = isLoading

            ?

            `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Saving...
            `

            :

            "Save Changes";

}