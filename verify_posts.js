
import { posts } from './src/data/posts.js';

const collection = posts.find(p => p.id === 9);
console.log('Post 9 type:', collection.type);
console.log('Post 9 has subPosts:', !!collection.subPosts);

const recentPosts = [...posts].reverse().slice(0, 3);
console.log('Recent posts IDs:', recentPosts.map(p => p.id));
const recentCollection = recentPosts.find(p => p.id === 9);
if (recentCollection) {
    console.log('Recent collection type:', recentCollection.type);
} else {
    console.log('Collection 9 not in recent posts');
}
