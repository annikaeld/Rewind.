import { API_BASE, API_SOCIAL, API_POSTS } from "./constants.js";
import { authFetch } from "./fetch.js";
import { load } from "../storage/load.js";

/**
 * Fetches a single post by ID, including author information.
 * Adds an 'editable' property if the current user is the author.
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object>} The post data.
 * @throws Will throw an error if the fetch fails.
 */
export async function getPost(id) {
  try {
    const profile = load("profile");
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS + `/${id}?_author=true`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    const postResponse = await response.json();
    const post = postResponse.data;
    post.editable = profile && profile.name == post.author.name;

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

/**
 * Publishes a new post.
 * @param {Object} postObject - The post data to publish.
 * @returns {Promise<Object>} The response data from the API.
 * @throws Will throw an error if the request fails.
 */
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

/**
 * Updates an existing post by ID.
 * @param {string} postId - The ID of the post to update.
 * @param {Object} postObject - The updated post data.
 * @returns {Promise<boolean>} True if the update was successful.
 * @throws Will throw an error if the update fails.
 */
export async function putPost(postId, postObject) {
  try {
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS + `/${postId}`, {
      method: "PUT",
      body: JSON.stringify(postObject),
    });
    if (!response.ok) {
      throw new Error(`Failed to update post: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

/**
 * Creates a new post.
 * @param {Object} postObject - The post data to create.
 * @returns {Promise<string>} The ID of the newly created post.
 * @throws Will throw an error if the creation fails.
 */
export async function postPost(postObject) {
  try {
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS, {
      method: "POST",
      body: JSON.stringify(postObject),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const responseBody = await response.json();
    const data = responseBody.data;
    const id = data.id;
    return await id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

/**
 * Deletes a post by ID.
 * @param {string} postId - The ID of the post to delete.
 * @returns {Promise<boolean>} True if the deletion was successful.
 * @throws Will throw an error if the deletion fails.
 */
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