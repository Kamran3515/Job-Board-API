import { enableEditMode } from "./profileEditor.js";
import { initializePreview } from "./profilePreview.js";
import { state } from "./profileState.js";

export function initializeProfileEvents(onSubmit) {

    initializePreview();

    if (state.editBtn) {

        state.editBtn.addEventListener(
            "click",
            enableEditMode,
        );

    }

    if (state.form) {

        state.form.addEventListener(
            "submit",
            onSubmit,
        );

    }

}