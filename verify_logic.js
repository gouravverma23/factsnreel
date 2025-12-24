
import { posts } from './src/data/posts.js';

const mockNavigate = (path) => console.log(`Navigating to: ${path}`);
const mockOpenModal = (post) => console.log(`Opening modal for: ${post.title}`);
const mockScrollTo = (x, y) => console.log(`Scrolling to: ${x}, ${y}`);

const handlePostClick = (post) => {
    // This mimics the updated logic in Home.jsx and Posts.jsx
    if (post.type === 'collection' || post.subPosts) {
        mockNavigate(`/posts/${post.id}`);
        mockScrollTo(0, 0);
    } else {
        mockOpenModal(post);
    }
};

const collectionPost = posts.find(p => p.id === 9);
const regularPost = posts.find(p => p.id === 1);

console.log('Testing Collection Post (ID 9):');
handlePostClick(collectionPost);

console.log('\nTesting Regular Post (ID 1):');
handlePostClick(regularPost);
