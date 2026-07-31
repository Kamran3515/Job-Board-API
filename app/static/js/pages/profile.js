import { getProfile, getProfileByUser, getSkills } from "../services/profile.js";
import { renderProfile } from "../components/profile/index.js";
import { toast } from "../utils/toast.js";
import { api } from "../api.js";

const container = document.getElementById("profile-container");

let profile;
let isOwner = true;

async function loadProfile() {

    try {
        if (window.CANDIDATE_ID) {
            console.log(window.CANDIDATE_ID);

            profile = await getProfileByUser(window.CANDIDATE_ID);
            isOwner = false;
        }
        else {profile = await getProfile();}

        renderProfile(profile, isOwner);
    }

    catch (error) {

        toast.error(error.detail || "Failed to load profile")
    }

}

loadProfile();