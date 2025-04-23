import { getPosts } from "../api/posts.js";

export async function loadPosts() {
  const postsContainer = document.getElementById("feed");
  try {
    const posts = await getPosts();
    posts.data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className =
        "p-4 bg-white dark:bg-zinc-700 dark:border-zinc-600 rounded-lg shadow-sm";
      postElement.innerHTML = `
                ${
                  post.media
                    ? `<img class="rounded-md mb-2" src="${post.media.url}" alt="${post.title}">`
                    : ""
                }
                <div>
                    <div class="font-semibold mb-1">${post.title}</div>
                </div>
            `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}
