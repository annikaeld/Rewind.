import { login } from "../api/auth/login.js";
import { save } from "../storage/save.js";
import { getFormValues } from "./getFormValues.js";
import { getMessageDivs } from "./getMessageDivs.js";
import {
    clearMessages,
    displayErrors,
    displaySuccess,
} from "./messages.js";


/**
 * Handles the login form submission.
 * @param {Event} event
 */
async function handleLoginSubmit(event) {
    console.log("Login form submitted");
    event.preventDefault();

    const { email, password } = getFormValues("loginForm");
    const { errorMessageDiv, successMessageDiv } = getMessageDivs();
    clearMessages(errorMessageDiv, successMessageDiv);

    try {
        const { response, data } = await login(email, password);

        if (response.ok) {
            const { accessToken, ...profile } = data.data;
            save("token", accessToken);
            save("profile", profile);
            displaySuccess(successMessageDiv, "Login successful!");
            setTimeout(() => {
                window.location.href = "feed";
            }, 2000);
        } else {
            displayErrors(errorMessageDiv, data.errors);
        }
    } catch (error) {
        console.error("Error:", error);
        errorMessageDiv.textContent =
            "An error occurred. Please try again later.";
    }
}

document
    .getElementById("loginForm")
    .addEventListener("submit", handleLoginSubmit);