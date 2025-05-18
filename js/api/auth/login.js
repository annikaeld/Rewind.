import { API_BASE, API_AUTH, API_LOGIN } from "../constants.js";
import { save } from "../../storage/save.js";
import { request } from "../request.js";
import { getFormValues } from "../../ui/getFormValues.js";
import { getMessageDivs } from "../../ui/getMessageDivs.js";
import {
  clearMessages,
  displayErrors,
  displaySuccess,
} from "../../ui/messages.js";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const { email, password } = getFormValues("loginForm");
    const { errorMessageDiv, successMessageDiv } = getMessageDivs();
    clearMessages(errorMessageDiv, successMessageDiv);

    try {
      const { response, data } = await request(
        API_BASE + API_AUTH + API_LOGIN,
        "POST",
        { email, password }
      );

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
  });
