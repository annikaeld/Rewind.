import { API_BASE, API_SOCIAL, API_POSTS, API_PROFILES } from "./constants.js";
import { authFetch } from "./fetch.js";

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

function getSearchUri(searchFor, searchType) {
  if (searchType === "Tags") {
    return API_BASE + API_SOCIAL + API_POSTS + `?_author=true&_tag=${encodeURIComponent(searchFor)}`;
  } else if (searchType === "Users") {
    return API_BASE + API_SOCIAL + API_PROFILES + `/${encodeURIComponent(searchFor)}/posts?_author=true`;
  } else {
    return API_BASE + API_SOCIAL + API_POSTS + `/search?_author=true&q=${encodeURIComponent(searchFor)}`;
  }
}

export async function searchPosts(searchFor, searchType) {
  try {
    const searchUri = getSearchUri(searchFor, searchType);
    const response = await authFetch(searchUri);

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