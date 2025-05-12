import { API_BASE, API_SOCIAL, API_POSTS } from "./constants.js";
import { authFetch } from "./fetch.js";

export async function getPosts() {
  try {
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS + `?_author=true`);

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
