import { getPost } from "/js/api/post.js";
import { deletePost } from "/js/api/post.js";

async function loadPostById(postId) {
  const postContainer = document.getElementById("post-container");
  try {
    const post = await getPost(postId);
    if (post) {
      postContainer.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${post.title}</h2>
                ${
                  post.media
                    ? `<img src="${post.media.url}" alt="${post.title}" class="rounded-md mb-4">`
                    : ""
                }
                <p>${post.body}</p>
                <div class="text-sm text-gray-500">${post.author.name}</div>
                ${
                  post.tags && post.tags.length > 0
                    ? `<p class="mt-2"><strong>Tags:</strong> ${post.tags.join(
                        ", "
                      )}</p>`
                    : ""
                }
                ${
                  post.editable
                    ? `
                    <button  class="bg-lime-400 text-black px-4 py-1 rounded-md font-semibold hover:bg-lime-300" onclick="onClickEditPost()">Edit</button>
                    <button  class="bg-lime-400 text-black px-4 py-1 rounded-md font-semibold hover:bg-lime-300" onclick="onClickDeletePost()">Delete</button>
                `
                    : ""
                }
            `;
    } else {
      postContainer.innerHTML = `<p class="text-red-500">Post not found.</p>`;
    }
  } catch (error) {
    console.error("Error loading post:", error);
    postContainer.innerHTML = `<p class="text-red-500">An error occurred while loading the post.</p>`;
  }
}

export async function onClickEditPost() {
  window.location.href = `/post/edit.html?id=${postId}`;
}

export async function onClickDeletePost() {
  await deletePost(postId);
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = `<p class="text-red-500">Post deleted.</p>`;
}
// Attach functions to the window object to make them globally accessible
window.onClickEditPost = onClickEditPost;
window.onClickDeletePost = onClickDeletePost;

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

if (postId) {
  loadPostById(postId);
} else {
  document.getElementById(
    "post-container"
  ).innerHTML = `<p class="text-red-500">No post ID provided.</p>`;
}
