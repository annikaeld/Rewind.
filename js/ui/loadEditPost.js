import { getPost } from "/js/api/post.js";
import { getFormValues } from "./getFormValues.js";
import { putPost, postPost } from "/js/api/post.js";

async function loadEditPostById(postId) {
  const postContainer = document.getElementById("post-container");
  try {
    let post;
    if (!postId) {
      post = {
        title: "",
        body: "",
        media: { url: "" },
        author: { name: "" },
        tags: [],
      };
    } else {
      post = await getPost(postId);
      post.media = post.media || { url: "" };
    }
    if (post) {
      postContainer.innerHTML = `
    <section class="max-w-xl mx-auto mt-6 p-4 bg-white dark:bg-zinc-200 rounded-xl">
        <form id="editPostForm">
            <input name="title" id="title" type="text" placeholder="Title" value="${
              post.title
            }" class="w-full p-2 border rounded-md bg-zinc-100 dark:border-indigo-950 border-gray-700 placeholder-gray-700 mt-4">
            <textarea name="content" id="content" class="w-full p-2 border dark:border-zinc-500 rounded-md bg-zinc-100 dark:border-indigo-950 border-gray-700 placeholder-gray-700 mt-4" placeholder="What's on your mind?" required="">${
              post.body
            }</textarea>

            <!-- Input for image URL -->
            <input type="url" name="imageUrl" id="imageUrl" placeholder="Paste image URL (optional)" value="${
              post.media.url
            }" class="mt-4 w-full border bg-zinc-100 rounded-md p-2 border dark:border-indigo-950 border-gray-700 placeholder-gray-700 text-sm">

            <input name="tags" id="tags" type="text" placeholder="Tags (comma separated)" value="${
              post.tags && post.tags.length > 0 ? `${post.tags.join(", ")}` : ""
            }" class="w-full p-2 border bg-zinc-100 rounded-md mt-4 border dark:border-indigo-950 border-gray-700 placeholder-gray-700 text-sm">
            <div class="mt-2 flex justify-end">
                <button type="submit" class="bg-lime-400 mt-4 text-black px-4 py-1 rounded-md font-semibold hover:bg-lime-300 border dark:border-indigo-950">
                    Save
                </button>
            </div>
        </form>
    </section>`;

      attachSubmitEventListener(postId, "editPostForm");
    } else {
      postContainer.innerHTML = `<p class="text-red-500">Post not found.</p>`;
    }
  } catch (error) {
    console.error("Error loading post:", error);
    postContainer.innerHTML = `<p class="text-red-500">An error occurred while loading the post.</p>`;
  }
}

function attachSubmitEventListener(postId, formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      savePost(postId);
    });
  } else {
    console.error(`Form with id "${formId}" not found.`);
  }
}

export async function savePost(postId) {
  const { title, content, imageUrl, tags } = getFormValues("editPostForm");

  // Use the first line of content as the title if title is not provided
  const derivedTitle = title || content.split("\n")[0]; // Split content by lines and use the first line

  const postObject = {
    title: derivedTitle,
    body: content,
    ...(tags &&
      tags.trim() && {
        // Only include tags if they are provided and not empty
        tags: tags.split(",").map((tag) => tag.trim()), // Split tags by commas and trim whitespace
      }),
    ...(imageUrl && {
      // Only include media if imageUrl is set
      media: {
        url: imageUrl,
        alt: "Post image", // Default alt text
      },
    }),
  };
  try {
    if (!postId) {
      const newPostId = await postPost(postObject);
      window.location.href = `/post/?id=${newPostId}`;
    } else {
      await putPost(postId, postObject);
      window.location.href = `/post/?id=${postId}`;
    }
  } catch (error) {
    console.error("Error saving post:", error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

if (postId) {
  await loadEditPostById(postId);
} else {
  await loadEditPostById(null);
}
