export function showToast(
    message,
    type = "success",
) {

    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");

    toast.className = `toast align-items-center text-bg-${type} border-0 show mb-2`;

    toast.role = "alert";

    toast.innerHTML = `

        <div class="d-flex">

        <div class="toast-body">

        ${message}

        </div>

        <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto">

        </button>

        </div>

        `;

    toastContainer.appendChild(
        toast,
    );

    toast
        .querySelector(".btn-close")
        .onclick = () => {

            toast.remove();

        };

    setTimeout(
        () => toast.remove(),
        3000,
    );

}