import { clearMessages, displayErrors, displaySuccess } from './messages.js';
import { getFormValues } from './getFormValues.js';
import { getMessageDivs } from './getMessageDivs.js';
import { registerUser } from '../api/auth/registerUser.js';

/**
 * Handles the registration form submission.
 * @param {Event} event
 */
async function handleRegisterSubmit(event) {
    event.preventDefault();

    const { name, email, password } = getFormValues('registerForm');
    const { errorMessageDiv, successMessageDiv } = getMessageDivs();
    clearMessages(errorMessageDiv, successMessageDiv);

    try {
        const { response, data } = await registerUser(name, email, password);

        if (response.ok) {
            displaySuccess(successMessageDiv, 'Registration successful! You can now log in.');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            displayErrors(errorMessageDiv, data.errors);
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessageDiv.textContent = 'An error occurred. Please try again later.';
    }
}

document.getElementById('registerForm').addEventListener('submit', handleRegisterSubmit);