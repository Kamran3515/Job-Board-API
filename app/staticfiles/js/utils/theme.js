const STORAGE_KEY = "theme";

export function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const icon = document.getElementById("theme-icon");

    if (icon) {
        icon.className =
            theme === "dark"
                ? "bi bi-sun-fill"
                : "bi bi-moon-stars-fill";
    }
}

export function toggleTheme() {
    const current =
        document.documentElement.getAttribute("data-theme") || "light";

    applyTheme(current === "dark" ? "light" : "dark");
}

export function initializeTheme() {
    const saved =
        localStorage.getItem(STORAGE_KEY) || "light";

    applyTheme(saved);
}