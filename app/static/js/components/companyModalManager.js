import { api } from "../api.js";
import { createCompany } from "../services/companies.js";
import { toast } from "../utils/toast.js";

let nameValue;
let descriptionValue;
let locationValue;
let websiteValue;
let modal;
let onSuccess = () => {};

export function initializeCompanyModal({onSuccess: success}) {

    onSuccess = success;
    modal = new bootstrap.Modal(document.getElementById("companyModal"));

    document.getElementById("create-company-btn").addEventListener("click",openCompanyModal);
    document.getElementById("company-form").addEventListener("submit",submitCompany);

}


function openCompanyModal() {

    modal.show();

}

async function submitCompany(e) {
    nameValue = document.getElementById("company-name").value;
    descriptionValue = document.getElementById("company-description").value;
    websiteValue = document.getElementById("company-website").value;
    locationValue = document.getElementById("company-location").value;

    e.preventDefault();

    try {
        if (!nameValue.trim || !descriptionValue.trim || !websiteValue.trim || !locationValue.trim){
            toast.error("Please Fill In All Fields")
            return;
        }
        
        await createCompany({

            name: document.getElementById("company-name").value,
            description: document.getElementById("company-description").value,
            website: document.getElementById("company-website").value,
            location: document.getElementById("company-location").value,

        });

        document.getElementById("company-form").reset();

        modal.hide();

       toast.success("Company created successfully.")

        await onSuccess();

    }

    catch (error) {

        toast.error(error)
    }

}