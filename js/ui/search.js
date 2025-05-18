import { getFormValues } from "./getFormValues.js";
import { searchPosts } from "/js/api/posts.js";
import { loadPosts } from "./loadPosts.js";

async function doSearch() {
    const { searchFor } = getFormValues('searchForm');
    const searchType = getSearchType();
    const posts = await searchPosts(searchFor, searchType);
    await loadPosts(posts);
}

/**
 * Returns the value of the selected radio button in the dropdownRadioForm.
 * @returns {string|null} The selected search type, or null if none selected.
 */
function getSearchType() {
    const form = document.getElementById('dropdownRadioForm');
    if (!form) {
        console.error('dropdownRadioForm not found');
        return null;
    }
    const checked = form.querySelector('input[name="searchType"]:checked');
    return checked ? checked.value : null;
}

function toggleDropdownMenuVisibility() {
    const menu = document.getElementById('dropdownMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    } else {
        console.error("Dropdown menu element not found!");
    }
}

function attachSubmitEventListener(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            doSearch();
        });
    } else {
        console.error(`Form with id "${formId}" not found.`);
    }
}

function attachDropdownButtonListener() {
    const dropdownButton = document.getElementById('dropdownDefaultButton');
    if (dropdownButton) {
        dropdownButton.addEventListener('click', toggleDropdownMenuVisibility);
    }
}

/**
 * Updates the dropdown button text to match the selected radio option,
 * and closes the dropdown menu after a selection is made.
 */
export function attachDropdownRadioListeners() {
    document.querySelectorAll('input[name="searchType"]').forEach(radio => {
        radio.addEventListener('change', function () {
            document.getElementById('dropdownSelectedText').textContent = this.value;
            document.getElementById('dropdownMenu').classList.add('hidden');
        });
    });
}

// Initialize the search form handler
document.addEventListener("DOMContentLoaded", () => {
    attachSubmitEventListener("searchForm");
    attachDropdownButtonListener();
    attachDropdownRadioListeners();
});
