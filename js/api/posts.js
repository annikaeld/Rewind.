import { API_BASE, API_SOCIAL, API_POSTS, API_PROFILES } from "./constants.js";
import { authFetch } from "./fetch.js";

/**
 * Fetches all posts with author information.
 * @returns {Promise<Object>} The posts data.
 * @throws Will throw an error if the fetch fails.
 */
export async function getPosts() {
  try {
    const response = await authFetch(
      API_BASE + API_SOCIAL + API_POSTS + `?_author=true`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

/**
 * Builds the search URI based on the search type and query.
 * @param {string} searchFor - The search query.
 * @param {string} searchType - The type of search ("Tags", "Users", or other).
 * @returns {string} The constructed search URI.
 */
function getSearchUri(searchFor, searchType) {
  if (searchType === "Tags") {
    return API_BASE + API_SOCIAL + API_POSTS + `?_author=true&_tag=${encodeURIComponent(searchFor)}`;
  } else if (searchType === "Users") {
    return API_BASE + API_SOCIAL + API_PROFILES + `/${encodeURIComponent(searchFor)}/posts?_author=true`;
  } else {
    return API_BASE + API_SOCIAL + API_POSTS + `/search?_author=true&q=${encodeURIComponent(searchFor)}`;
  }
}

/**
 * Searches for posts based on the search query and type.
 * @param {string} searchFor - The search query.
 * @param {string} searchType - The type of search ("Tags", "Users", or other).
 * @returns {Promise<Object>} The posts data matching the search.
 * @throws Will throw an error if the fetch fails.
 */
export async function searchPosts(searchFor, searchType) {
  try {
    const searchUri = getSearchUri(searchFor, searchType);
    const response = await authFetch(searchUri);
    if (response === null) {
      return null; // Handle 404 by returning null
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}