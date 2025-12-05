import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import useModalBackHandler from '../hooks/useModalBackHandler';

const Posts = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const { openModal, closeModal } = useModalBackHandler(setSelectedPost);
    const [query, setQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const { collectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine which posts to show (all posts or collection sub-posts)
    const activeCollection = useMemo(() => {
        if (collectionId) {
            return posts.find(p => p.id === parseInt(collectionId));
        }
        return null;
    }, [collectionId]);

    const activePosts = useMemo(() => {
        return activeCollection ? activeCollection.subPosts : posts;
    }, [activeCollection]);

    // Extract unique topics from active posts
    const topics = useMemo(() => ['All', ...new Set(activePosts.map(post => post.topic))], [activePosts]);

    // Flatten all posts for global search (including sub-posts)
    const allSearchablePosts = useMemo(() => {
        const flattened = [];
        posts.forEach(post => {
            flattened.push(post);
            if (post.subPosts) {
                flattened.push(...post.subPosts);
            }
        });
        return flattened;
    }, []);

    // Fuse.js configuration
    // If inside a collection, search only that collection.
    // If global (no collection), search ALL posts (including sub-posts).
    const searchSource = useMemo(() => {
        return activeCollection ? activeCollection.subPosts : allSearchablePosts;
    }, [activeCollection, allSearchablePosts]);

    const fuse = useMemo(() => new Fuse(searchSource, {
        keys: ['title', 'description', 'topic', 'subtopics', 'content.text', 'type'],
        threshold: 0.3,
        includeScore: true
    }), [searchSource]);

    // Search results with filtering
    const searchResults = useMemo(() => {
        let results = activePosts;

        if (query) {
            results = fuse.search(query).map(result => result.item);
        } else {
            // Default view: 
            // If it's a collection, show in increasing order (as defined).
            // If it's the main list, sort by latest (reverse).
            if (activeCollection) {
                results = [...activePosts];
            } else {
                results = [...activePosts].reverse();
            }
        }

        if (selectedTopic !== 'All') {
            results = results.filter(post => post.topic === selectedTopic);
        }

        return results;
    }, [query, fuse, selectedTopic, activePosts]);

    const handlePostClick = (post) => {
        if (post.type === 'collection') {
            navigate(`/posts/${post.id}`);
            window.scrollTo(0, 0);
        } else {
            openModal(post);
        }
    };

    // Removed auto-scroll effect as per user request

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-2xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold text-white mb-6">
                    {activeCollection ? (
                        <>
                            <span className="text-dark-accent">{activeCollection.title}</span> Collection
                        </>
                    ) : (
                        <>All <span className="text-dark-accent">Posts</span></>
                    )}
                </h1>

                {/* Search Input */}
                <div className="relative group mb-8">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-dark-muted group-focus-within:text-dark-accent transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-12 pr-4 py-4 bg-dark-surface border border-dark-border rounded-full text-white placeholder-dark-muted focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent transition-all shadow-lg"
                        placeholder="Search topics, facts, or keywords..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2">
                    {topics.map(topic => (
                        <button
                            key={topic}
                            onClick={() => setSelectedTopic(topic)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTopic === topic
                                ? 'bg-dark-accent text-white shadow-neon'
                                : 'bg-dark-surface border border-dark-border text-dark-muted hover:border-dark-accent hover:text-white'
                                }`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.length > 0 ? (
                    searchResults.map((post, index) => (
                        <div key={post.id}>
                            <PostCard post={post} onClick={handlePostClick} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-dark-muted text-lg">No posts found matching your criteria.</p>
                    </div>
                )}
            </div>

            {selectedPost && (
                <PostModal post={selectedPost} onClose={closeModal} />
            )}
        </div>
    );
};

export default Posts;
