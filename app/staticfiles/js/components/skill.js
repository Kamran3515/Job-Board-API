import { getAllSkills } from "../services/skills.js";
import { toast } from "../utils/toast.js";

let skills = [];

export async function loadSkills(selected = []) {

    try {

        skills = await getAllSkills();

        const container =
            document.getElementById("skills-list");

        container.innerHTML = "";

        skills.forEach(skill => {

            container.innerHTML += `

                <div
                    class="form-check mb-2 skill-item"
                    data-name="${skill.name.toLowerCase()}">

                    <input
                        class="form-check-input"
                        type="checkbox"
                        value="${skill.name}"
                        id="skill-${skill.id}"
                        ${selected.includes(skill.name) ? "checked" : ""}>

                    <label
                        class="form-check-label"
                        for="skill-${skill.id}">

                        ${skill.name}

                    </label>

                </div>

            `;

        });

        initializeSkillSearch();

    }

    catch (error) {

        toast.error(error);

    }

}

function initializeSkillSearch() {

    const search =
        document.getElementById("skills-search");

    search.addEventListener("input", () => {

        const keyword =
            search.value.toLowerCase();

        document
            .querySelectorAll(".skill-item")
            .forEach(item => {

                item.style.display =
                    item.dataset.name.includes(keyword)

                        ? ""

                        : "none";

            });

    });

}

export function getSelectedSkills() {

    return [

        ...document.querySelectorAll(

            "#skills-list input:checked"

        )

    ].map(input => input.value);

}