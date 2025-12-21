import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import PostCardSkeleton from '../components/PostCardSkeleton';
import { posts as staticPosts } from '../data/posts';
const Posts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [query, setQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const { collectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setPosts(staticPosts);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (loading || posts.length === 0) return;

        const postId = searchParams.get('postId');
        const topicParam = searchParams.get('topic');

        // Handle Topic Selection from URL
        if (topicParam) {
            setSelectedTopic(topicParam);
        } else {
            setSelectedTopic('All');
        }

        // Handle Post Selection from URL
        if (postId) {
            // Check main posts
            let foundPost = posts.find(p => String(p.id) === String(postId));

            // Check subposts if not found
            if (!foundPost) {
                for (const post of posts) {
                    if (post.subPosts) {
                        const subPost = post.subPosts.find(sp => sp.id === postId || sp.id === parseInt(postId));
                        if (subPost) {
                            foundPost = subPost;
                            break;
                        }
                    }
                }
            }
            setSelectedPost(foundPost || null);
        } else {
            setSelectedPost(null);
        }
    }, [searchParams, collectionId, loading, posts]);

    const openModal = (post) => {
        setSearchParams({ ...Object.fromEntries(searchParams), postId: post.id }, { state: { modal: true } });
    };

    const closeModal = () => {
        if (location.state?.modal) {
            navigate(-1);
        } else {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('postId');
            setSearchParams(newParams);
        }
    };

    // Determine which posts to show (all posts or collection sub-posts)
    const activeCollection = useMemo(() => {
        if (collectionId) {
            return posts.find(p => p.id === parseInt(collectionId));
        }
        return null;
    }, [collectionId, posts]);

    const activePosts = useMemo(() => {
        return (activeCollection && activeCollection.subPosts) ? activeCollection.subPosts : posts;
    }, [activeCollection, posts]);

    // Extract unique topics from active posts
    const topics = useMemo(() => {
        const allTopics = activePosts.map(post => {
            if (Array.isArray(post.topic)) {
                return post.topic;
            }
            return post.topic;
        }).flat();
        return ['All', ...new Set(allTopics)];
    }, [activePosts]);

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
    }, [posts]);

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
            results = results.filter(post => {
                if (Array.isArray(post.topic)) {
                    return post.topic.includes(selectedTopic);
                }
                return post.topic === selectedTopic;
            });
        }

        return results;
    }, [query, fuse, selectedTopic, activePosts]);

    const handlePostClick = (post) => {
        if (post.type === 'collection' || post.subPosts) {
            navigate(`/posts/${post.id}`);
            window.scrollTo(0, 0);
        } else {
            openModal(post);
        }
    };



    const handleNextPost = () => {
        if (selectedPost && activeCollection) {
            const currentIndex = activeCollection.subPosts.findIndex(p => p.id === selectedPost.id);
            if (currentIndex !== -1 && currentIndex < activeCollection.subPosts.length - 1) {
                const nextPost = activeCollection.subPosts[currentIndex + 1];
                setSearchParams(
                    { ...Object.fromEntries(searchParams), postId: nextPost.id },
                    { replace: true, state: { modal: true } }
                );
            }
        }
    };

    const handlePrevPost = () => {
        if (selectedPost && activeCollection) {
            const currentIndex = activeCollection.subPosts.findIndex(p => p.id === selectedPost.id);
            if (currentIndex > 0) {
                const prevPost = activeCollection.subPosts[currentIndex - 1];
                setSearchParams(
                    { ...Object.fromEntries(searchParams), postId: prevPost.id },
                    { replace: true, state: { modal: true } }
                );
            }
        }
    };

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
                            onClick={() => {
                                const newParams = new URLSearchParams(searchParams);
                                const currentTopic = searchParams.get('topic');
                                const isCurrentlyAll = !currentTopic || currentTopic === 'All';

                                if (topic === 'All') {
                                    newParams.delete('topic');
                                } else {
                                    newParams.set('topic', topic);
                                }

                                // Ideally, we want to be able to go "Back" to "All" view.
                                // So if we are currently at "All", we PUSH (don't replace).
                                // But if we are already filtering (Topic A), switching to Topic B should REPLACE (to avoid history chain).
                                setSearchParams(newParams, { replace: !isCurrentlyAll });
                            }}
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
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <PostCardSkeleton key={i} />
                    ))
                ) : error ? (
                    <div className="col-span-full text-center py-20 bg-dark-surface border border-dark-border rounded-2xl p-8">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-dark-accent text-white rounded-full font-bold hover:shadow-neon transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                ) : searchResults.length > 0 ? (
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
                <PostModal
                    post={selectedPost}
                    onClose={closeModal}
                    onNextPost={activeCollection ? handleNextPost : undefined}
                    onPrevPost={activeCollection ? handlePrevPost : undefined}
                    hasNext={activeCollection && selectedPost ? activeCollection.subPosts.findIndex(p => p.id === selectedPost.id) < activeCollection.subPosts.length - 1 : false}
                    hasPrev={activeCollection && selectedPost ? activeCollection.subPosts.findIndex(p => p.id === selectedPost.id) > 0 : false}
                />
            )}
        </div>
    );
};

export default Posts;
