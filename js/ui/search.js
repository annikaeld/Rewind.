import { getFormValues } from "./getFormValues.js";
import { searchPosts } from "/js/api/posts.js";
import { loadPosts } from "./loadPosts.js";

function attachSubmitEventListener(formId) {
    console.log("Attaching submit event listener to form with id:", formId);
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

async function doSearch() {
    const { searchFor } = getFormValues('searchForm');
    console.log(searchFor);
    const posts = await searchPosts(searchFor);
    console.log(posts);
    await loadPosts(posts);
    // const searchInput = searchForm.querySelector('input[name="q"]');
    // const query = searchInput ? searchInput.value.trim() : "";

    // if (query) {
    //     // Redirect to the search results page with the query as a URL parameter
    //     window.location.href = `/search?q=${encodeURIComponent(query)}`;
    // } else {
    //     alert("Please enter a search term.");
    // }
}
// Function to handle the search form submission
function handleSearchForm() {
    const searchForm = document.querySelector('form[action="/search"]');
    if (!searchForm) {
        console.error("Search form not found.");
        return;
    }

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const { searchFor } = getFormValues('searchForm');
        console.log(searchFor);
        // const searchInput = searchForm.querySelector('input[name="q"]');
        // const query = searchInput ? searchInput.value.trim() : "";

        // if (query) {
        //     // Redirect to the search results page with the query as a URL parameter
        //     window.location.href = `/search?q=${encodeURIComponent(query)}`;
        // } else {
        //     alert("Please enter a search term.");
        // }
    });
}

// Initialize the search form handler
document.addEventListener("DOMContentLoaded", () => {
    attachSubmitEventListener("searchForm");
});