import { state } from "./profileState.js";
import { renderSkills } from "./profileRenderer.js";

export function enableEditMode() {

    document
        .querySelectorAll(
            "#profile-form input:not([type=file]), #profile-form textarea"
        )
        .forEach(element => {

            element.removeAttribute("readonly");

        });


    renderSkills(state.profile, true);
    state.avatarLabel.classList.remove("d-none");

    document
        .getElementById("resume-upload-label")
        .classList.remove("d-none");

    state.saveBtn.classList.remove("d-none");

    state.editBtn?.classList.add("d-none");

}

export function disableEditMode() {

    document
        .querySelectorAll(
            "#profile-form input:not([type=file]), #profile-form textarea"
        )
        .forEach(element => {

            element.setAttribute(
                "readonly",
                true,
            );

        });
    renderSkills(state.profile, false);

    state.avatarLabel.classList.add("d-none");

    document
        .getElementById("resume-upload-label")
        .classList.add("d-none");

    state.saveBtn.classList.add("d-none");

    state.editBtn?.classList.remove("d-none");

}

