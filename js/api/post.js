import { API_BASE, API_SOCIAL, API_POSTS } from "./constants.js";
import { authFetch } from "./fetch.js";

export async function getPost(id) {
  try {
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS+ `/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const postResponse = await response.json();
    console.log("Fetched response:", postResponse);
    const post = postResponse.data;
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}
