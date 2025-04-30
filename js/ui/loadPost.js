import { getPost } from '/js/api/post.js';
    
async function loadPostById(postId) {
    const postContainer = document.getElementById('post-container');
    try {
        const post = await getPost(postId);
        console.log(post);
        if (post) {
            postContainer.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${post.title}</h2>
                ${post.media ? `<img src="${post.media.url}" alt="${post.title}" class="rounded-md mb-4">` : ''}
                <p>${post.body}</p>
            `;
        } else {
            postContainer.innerHTML = `<p class="text-red-500">Post not found.</p>`;
        }
    } catch (error) {
        console.error('Error loading post:', error);
        postContainer.innerHTML = `<p class="text-red-500">An error occurred while loading the post.</p>`;
    }
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (postId) {
    loadPostById(postId);
} else {
    document.getElementById('post-container').innerHTML = `<p class="text-red-500">No post ID provided.</p>`;
}
