import { API_BASE, API_SOCIAL, API_POSTS } from "./constants.js";
import { authFetch } from "./fetch.js";
import { load } from "../storage/load.js";

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

export async function postPost(postObject) {
  try {
    const response = await authFetch(API_BASE + API_SOCIAL + API_POSTS, {
      method: "POST",
      body: JSON.stringify(postObject),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    //log response body
    const responseBody = await response.json();
    const data = responseBody.data;
    const id = data.id;
    return await id;
  } catch (error) {
    console.error("Error creating post:", error);
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