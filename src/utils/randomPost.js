import { posts } from '../data/posts';

export const getRandomPostId = (currentId = null) => {
    let allPosts = [];

    posts.forEach(post => {
        if (post.subPosts && post.subPosts.length > 0) {
            allPosts = [...allPosts, ...post.subPosts];
        } else if (post.type !== 'collection') {
            allPosts.push(post);
        }
    });

    // Filter out the current post to avoid showing the same one twice in a row
    const availablePosts = currentId
        ? allPosts.filter(p => String(p.id) !== String(currentId))
        : allPosts;

    if (availablePosts.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * availablePosts.length);
    return availablePosts[randomIndex].id;
};
