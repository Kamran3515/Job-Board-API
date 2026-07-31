import { showToast } from "../components/showToast.js";
import { api } from "../api.js";

export const toast = {

    success(message) {

        showToast(
            message,
            "success",
        );

    },

    error(error) {

        showToast(

            api.normalizeError(error),
            "danger",
        );

    },

    warning(message) {

        showToast(
            message,
            "warning",
        );

    },

    info(message) {

        showToast(
            message,
            "info",
        );

    },

};