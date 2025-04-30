import { API_BASE, API_AUTH, API_REGISTER } from '../constants.js';
import { request } from '../request.js';
import { clearMessages, displayErrors, displaySuccess } from '../../ui/messages.js';
import { getFormValues } from '../../ui/getFormValues.js';
import { getMessageDivs } from '../../ui/getMessageDivs.js';

document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const { name, email, password } = getFormValues('registerForm');
    const { errorMessageDiv, successMessageDiv } = getMessageDivs();
    clearMessages(errorMessageDiv, successMessageDiv);

    try {
        const { response, data } = await request(API_BASE + API_AUTH + API_REGISTER, 'POST', { name, email, password });

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
});