import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import useModalBackHandler from '../hooks/useModalBackHandler';

const Posts = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const { openModal, closeModal } = useModalBackHandler(setSelectedPost);
    const scrollTargetRef = useRef(null);
    const [query, setQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const location = useLocation();

    // Extract unique topics
    const topics = useMemo(() => ['All', ...new Set(posts.map(post => post.topic))], []);

    // Fuse.js configuration
    const fuse = useMemo(() => new Fuse(posts, {
        keys: ['title', 'description', 'topic', 'subtopics', 'content.text'],
        threshold: 0.3,
        includeScore: true
    }), []);

    // Search results with filtering
    const searchResults = useMemo(() => {
        let results = posts;

        if (query) {
            results = fuse.search(query).map(result => result.item);
        } else {
            // Default view: Sort by latest (reverse)
            results = [...posts].reverse();
        }

        if (selectedTopic !== 'All') {
            results = results.filter(post => post.topic === selectedTopic);
        }

        return results;
    }, [query, fuse, selectedTopic]);

    useEffect(() => {
        // Scroll to the 4th post (index 3) on mount ONLY if not searching, no filter, AND not from "Explore Now"
        if (!query && selectedTopic === 'All' && scrollTargetRef.current && !location.state?.fromExploreNow) {
            scrollTargetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [query, selectedTopic, location.state]);

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-2xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold text-white mb-6">All <span className="text-dark-accent">Posts</span></h1>

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
                        <div key={post.id} ref={(!query && selectedTopic === 'All' && index === 3) ? scrollTargetRef : null}>
                            <PostCard post={post} onClick={openModal} />
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
