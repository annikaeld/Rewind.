export function getFormValues(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    const values = {};
    for (const [key, value] of formData.entries()) {
        values[key] = value;
    }

    return values;
}