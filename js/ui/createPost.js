import { getFormValues } from './getFormValues.js';
import { publishPost } from '../api/post.js';

export async function createPost() {
    //Todo: Add tags
    const { title, content, imageUrl, tags } = getFormValues('createPostForm');

    // Use the first line of content as the title if title is not provided
    const derivedTitle = title || content.split('\n')[0]; // Split content by lines and use the first line

    const postObject = {
        title: derivedTitle,
        body: content,
        ...(tags && tags.trim() && { // Only include tags if they are provided and not empty
            tags: tags.split(',').map(tag => tag.trim()) // Split tags by commas and trim whitespace
        }),
        ...(imageUrl && { // Only include media if imageUrl is set
            media: {
                url: imageUrl,
                alt: "Post image" // Default alt text
            }
        })
    };
    await publishPost(postObject);
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createPostForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            createPost();
        });
    } else {
        console.error('Form with id "createPostForm" not found on DOMContentLoaded.');
    }
});