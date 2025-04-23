import { API_KEY, API_BASE, API_SOCIAL, API_POSTS } from "./constants.js";
import { load } from "../storage/load.js";

export async function getPosts() {
  try {
    // Fetch the token from local storage
    const token = load("token");
    if (!token) {
      throw new Error("No token found in local storage");
    }

    // Make the GET request with the Authorization header
    const response = await fetch(`${API_BASE}/${API_SOCIAL}/${API_POSTS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const posts = await response.json();
    console.log("Fetched posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
