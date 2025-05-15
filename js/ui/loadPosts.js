import { getPosts } from "../api/posts.js";

export async function loadPosts(posts) {
  const postsContainer = document.getElementById("feed");
  postsContainer.innerHTML = ""; // Clear existing posts
  console.log("loadPosts");
  try {
    posts.data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className =
        "p-4 bg-white border border-zinc-200 dark:bg-zinc-700 dark:border-zinc-600 rounded-lg shadow-md";
      postElement.innerHTML = `
                <a href="/post/?id=${post.id}">
                ${
                  post.media
                    ? `<div class="flex justify-center">
                    <img class="rounded-md mb-2 justify-center" src="${post.media.url}" alt="${post.title}">
                    </div>`
                    : ""
                }
                <div>
                    <div class="font-semibold mb-1">${post.title}</div>
                    <div class="text-sm text-gray-500">${post.author.name}</div>
                </div>
                </a>
            `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

export async function loadAllPosts() {
  const postsContainer = document.getElementById("feed");
  postsContainer.innerHTML = ""; // Clear existing posts
  const posts = await getPosts();
  await loadPosts(posts);
}
loadAllPosts();
