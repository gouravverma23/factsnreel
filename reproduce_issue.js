
const posts = [{ id: 9, title: 'Collection' }];
const postId = '9-1';

const originalLogic = posts.find(p => p.id === parseInt(postId));
console.log('Original logic finds:', originalLogic);

const newLogic = posts.find(p => String(p.id) === String(postId));
console.log('New logic finds:', newLogic);
