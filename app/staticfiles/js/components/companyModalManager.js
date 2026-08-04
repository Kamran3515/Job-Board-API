import { api } from "../api.js";
import { createCompany, updateCompany } from "../services/companies.js";
import { toast } from "../utils/toast.js";

let editMode = false;
let editingCompanyId = null;
let nameValue;
let descriptionValue;
let locationValue;
let websiteValue;
let modal;
let companyLogo;
let companyLogoPreview;
let onSuccess = () => {};

export function initializeCompanyModal({onSuccess: success}) {

    onSuccess = success;
    modal = new bootstrap.Modal(document.getElementById("companyModal"));

    document.getElementById("create-company-btn").addEventListener("click",openCompanyModal);
    document.getElementById("company-form").addEventListener("submit",submitCompany);

    companyLogo = document.getElementById("company-logo");
    companyLogoPreview = document.getElementById("company-logo-preview");

    companyLogo.addEventListener("change", () => {

        const file = companyLogo.files[0];

        if (!file) return;

        companyLogoPreview.src = URL.createObjectURL(file);

    });
}

function openCompanyModal() {

    modal.show();
}

export function openEditCompanyModal(company){

    editMode = true;

    editingCompanyId = company.id;

    document.querySelector(".modal-title").innerHTML = `
        <i class="bi bi-pencil-square me-2 text-primary"></i>
        Edit Company
    `;

    document.getElementById("create-company-btn").innerHTML = `
        <i class="bi bi-check-circle me-2"></i>
        Save Changes
    `;

    document.getElementById("company-name").value =
        company.name;

    document.getElementById("company-description").value =
        company.description;

    document.getElementById("company-location").value =
        company.location;

    document.getElementById("company-website").value =
        company.website;

    document.getElementById("company-logo-preview").src =
        company.logo ||
        "/static/images/company-placeholder.svg";

    modal.show();

}

async function submitCompany(e) {
    nameValue = document.getElementById("company-name").value;
    descriptionValue = document.getElementById("company-description").value;
    websiteValue = document.getElementById("company-website").value;
    locationValue = document.getElementById("company-location").value;

    e.preventDefault();

    try {
        if (!nameValue.trim() || !descriptionValue.trim() || !websiteValue.trim() || !locationValue.trim()){
            toast.error("Please Fill In All Fields")
            return;
        }
        
        const formData = new FormData();

        formData.append("name", nameValue);
        formData.append("description", descriptionValue);
        formData.append("website", websiteValue);
        formData.append("location", locationValue);
        
        if (companyLogo.files[0]) {

            formData.append(
                "logo",
                companyLogo.files[0]
            );

        }

        if(editMode){
            await updateCompany(
                editingCompanyId,
                formData,
            );

        }
        else{

            await createCompany(formData);

        }

        document.getElementById("company-form").reset();

        modal.hide();

       toast.success("Company created successfully.")

        await onSuccess();

    }

    catch (error) {

        toast.error(error.detail || "something went wrong")
    }

}