import { useState, useEffect, useRef } from 'react';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import useModalBackHandler from '../hooks/useModalBackHandler';

const Posts = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const { openModal, closeModal } = useModalBackHandler(setSelectedPost);
    const scrollTargetRef = useRef(null);

    // Sort by latest (reverse)
    const allPosts = [...posts].reverse();

    useEffect(() => {
        // Scroll to the 4th post (index 3) on mount
        if (scrollTargetRef.current) {
            scrollTargetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12 text-white">All <span className="text-dark-accent">Posts</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPosts.map((post, index) => (
                    <div key={post.id} ref={index === 3 ? scrollTargetRef : null}>
                        <PostCard post={post} onClick={openModal} />
                    </div>
                ))}
            </div>

            {selectedPost && (
                <PostModal post={selectedPost} onClose={closeModal} />
            )}
        </div>
    );
};

export default Posts;
