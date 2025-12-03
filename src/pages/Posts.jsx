import { useState } from 'react';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';

const Posts = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-white">All <span className="text-dark-accent">Posts</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} onClick={setSelectedPost} />
                ))}
            </div>

            {selectedPost && (
                <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
};

export default Posts;
