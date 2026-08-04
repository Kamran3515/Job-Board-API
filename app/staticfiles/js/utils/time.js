export function timeAgo(dateString) {

    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: "Year", seconds: 31536000 },
        { label: "Month", seconds: 2592000 },
        { label: "Week", seconds: 604800 },
        { label: "Day", seconds: 86400 },
        { label: "Hour", seconds: 3600 },
        { label: "Minute", seconds: 60 },
    ];

    for (const interval of intervals) {

        const value = Math.floor(seconds / interval.seconds);

        if (value >= 1) {

            return `${value} ${interval.label}${value > 1 ? "s" : ""} Ago`;

        }

    }

    return "A Few Moments";
}