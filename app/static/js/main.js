import { getJobs } from "./jobs.js";

async function loadJobs() {

    const jobs =
        await getJobs();

    const container =
        document.getElementById(
            "jobs-container"
        );

    jobs.results.forEach(job => {

        container.innerHTML += `

<div class="col-md-6 mb-4">

<div class="card shadow-sm">

<div class="card-body">

<h4>

${job.title}

</h4>

<p>

${job.location}

</p>

</div>

</div>

</div>

`;

    });

}

loadJobs();