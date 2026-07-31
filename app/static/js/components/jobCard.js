import { timeAgo } from "../utils/time.js";

export function jobCard(job){

    const skills = job.skills.slice(0,3);

    const moreSkills =
        job.skills.length > 3
            ? `<span class="badge bg-secondary">
                +${job.skills.length-3} more
            </span>`
            : "";

    const salary =
        job.salary_min && job.salary_max
        ? `$${job.salary_min} - $${job.salary_max}`
        : "Negotiable";

return`

<div class="col-lg-6 col-xl-4 mb-4">

<div class="card job-card h-100">

<div class="card-body">

<div class="d-flex justify-content-between">

<div>

<div class="job-company">

🏢 ${job.company_name}

</div>

</div>

<span class="badge bg-primary">

${job.job_type}

</span>

</div>

<h5 class="job-title">

${job.title}

</h5>

<div class="job-meta">

<span>📍 ${job.location}</span>

<span>⭐ ${job.experience_level}</span>

</div>

<div class="mt-3">

<strong class="text-success">

💰 ${salary}

</strong>

</div>

<div class="job-tags">

${skills.map(skill=>`

<span class="badge bg-light text-dark">

${skill}

</span>

`).join("")}

${moreSkills}

</div>

<div class="job-footer">

<small class="text-muted">

${timeAgo(job.created_at)}

</small>

<a

href="/jobs/${job.id}/"

class="btn btn-primary rounded-pill align-content-center">

View Details

</a>

</div>

</div>

</div>

</div>

`;

}