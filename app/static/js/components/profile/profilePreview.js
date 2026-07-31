import { state } from "./profileState.js";

export function initializePreview() {

    if (state.avatar) {

        state.avatar.addEventListener(
            "change",
            () => previewAvatar(
                state.avatar,
                state.avatarPreview,
            ),
        );

    }

    if (state.resume) {

        state.resume.addEventListener(
            "change",
            () => previewResume(
                state.resume,
                state.resumeFileName,
            ),
        );

    }

}

function previewAvatar(input, preview) {

    const file = input.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);

}

function previewResume(input, label) {

    if (input.files.length > 0) {

        label.textContent = input.files[0].name;
    }

    else {

        label.textContent = "No file selected";
    }

}