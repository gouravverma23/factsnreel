
const posts = [{ id: 9, title: 'Collection' }];
const postId = '9-1';

// Simulating the NEW logic
const foundPost = posts.find(p => String(p.id) === String(postId));
console.log('New logic match:', foundPost);

if (!foundPost) {
    console.log('Correctly did NOT match parent collection.');
} else {
    console.log('FAIL: Still matched parent collection.');
}
