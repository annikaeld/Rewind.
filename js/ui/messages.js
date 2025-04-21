export function clearMessages(errorDiv, successDiv) {
    if (errorDiv) errorDiv.innerHTML = '';
    if (successDiv) successDiv.innerHTML = '';
}

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

export function displaySuccess(successDiv, message) {
    successDiv.textContent = message;
}