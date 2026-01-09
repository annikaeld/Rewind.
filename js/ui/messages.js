/**
 * Clears the contents of the error and success message divs.
 * @param {HTMLElement} errorDiv - The div for error messages.
 * @param {HTMLElement} successDiv - The div for success messages.
 */
export function clearMessages(errorDiv, successDiv) {
    if (errorDiv) errorDiv.innerHTML = '';
    if (successDiv) successDiv.innerHTML = '';
}

/**
 * Displays error messages in the specified error div.
 * @param {HTMLElement} errorDiv - The div to display error messages in.
 * @param {Array<{message: string}>} errors - The array of error objects.
 */
export function displayErrors(errorDiv, errors) {
    if (errors && Array.isArray(errors)) {
        errors.forEach(error => {
            const errorItem = document.createElement('p');
            errorItem.textContent = error.message;
            errorDiv.appendChild(errorItem);
        });
    } else {
        errorDiv.textContent = 'An unknown error occurred.';
    }
}

/**
 * Displays a success message in the specified success div.
 * @param {HTMLElement} successDiv - The div to display the success message in.
 * @param {string} message - The success message to display.
 */
export function displaySuccess(successDiv, message) {
    successDiv.textContent = message;
}