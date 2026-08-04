export function dashboardStats(stats) {

    const cards =
        stats.role === "EMPLOYER"
            ? [
                {
                    title: "📋 Total Jobs",
                    value: stats.total_jobs,
                    color: "primary",
                },
                {
                    title: "📨 Applications",
                    value: stats.applications,
                    color: "info",
                },
                {
                    title: "✅ Accepted",
                    value: stats.accepted,
                    color: "success",
                },
                {
                    title: "🕒 Pending",
                    value: stats.pending,
                    color: "warning",
                },
                {
                    title: "👀 Reviewed",
                    value: stats.reviewed,
                    color: "info",
                },
                {
                    title: "❌ Rejected",
                    value: stats.rejected,
                    color: "danger",
                },
            ]
            : [
                {
                    title: "💼 Applied Jobs",
                    value: stats.applied_jobs,
                    color: "primary",
                },
                {
                    title: "✅ Accepted",
                    value: stats.accepted,
                    color: "success",
                },
                {
                    title: "🕒 Pending",
                    value: stats.pending,
                    color: "warning",
                },
                {
                    title: "👀 Reviewed",
                    value: stats.reviewed,
                    color: "info",
                },
                {
                    title: "❌ Rejected",
                    value: stats.rejected,
                    color: "danger",
                },
            ];

    return `

        <div class="row g-4 mb-4">

            ${cards.map(card).join("")}

        </div>

    `;

}

function card(item) {

    return `

        <div class="col-md">

            <div class="card shadow border-0 rounded-4 h-100">

                <div class="card-body text-center">

                    <h6 class="text-${item.color} fw-semibold">

                        ${item.title}

                    </h6>

                    <h2 class="fw-bold mb-0">

                        ${item.value}

                    </h2>

                </div>

            </div>

        </div>

    `;

}