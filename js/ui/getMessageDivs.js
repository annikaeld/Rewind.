/**
 * Retrieves the error and success message div elements from the DOM.
 * @returns {{errorMessageDiv: HTMLElement, successMessageDiv: HTMLElement}} An object containing the error and success message divs.
 */
export function getMessageDivs() {
    return {
        errorMessageDiv: document.getElementById('error-message'),
        successMessageDiv: document.getElementById('success-message'),
    };
}