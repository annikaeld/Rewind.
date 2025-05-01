import { API_BASE, API_SOCIAL, API_POSTS } from "./constants.js";
import { authFetch } from "./fetch.js";

export async function getPost(id) {
  try {
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS+ `/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const postResponse = await response.json();
    const post = postResponse.data;
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export async function publishPost(postObject) {
  try {
      const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS,
          {
              method: 'POST',
              body: JSON.stringify(postObject),
          });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error publishing post:', error);
      throw error;
  }
}

export async function deletePost(postId) {
  try {
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS + `/${postId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}