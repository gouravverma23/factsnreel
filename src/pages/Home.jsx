import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { posts } from '../data/posts';
import { categories } from '../data/store';
import { aboutData } from '../data/about';
import PostCard from '../components/PostCard';
import CategoryCard from '../components/CategoryCard';
import ContactSection from '../components/ContactSection';
import useScrollAnimation from '../hooks/useScrollAnimation';
import PostModal from '../components/PostModal';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();
    const recentPosts = [...posts].reverse().slice(0, 3);

    useEffect(() => {
        const postId = searchParams.get('postId');
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
    }, [searchParams]);

    const location = useLocation();

    // ... (existing helper functions if any, but we are inside component)

    const openModal = (post) => {
        setSearchParams({ postId: post.id }, { state: { modal: true } });
    };

    const closeModal = () => {
        if (location.state?.modal) {
            navigate(-1);
        } else {
            setSearchParams({});
        }
    };

    const handlePostClick = (post) => {
        if (post.type === 'collection' || post.subPosts) {
            navigate(`/posts/${post.id}`);
            window.scrollTo(0, 0);
        } else {
            openModal(post);
        }
    };

    const buttonClass = "inline-flex items-center gap-2 px-10 py-4 bg-dark-accent text-white font-bold rounded-full hover:bg-white hover:text-dark-accent hover:shadow-neon transition-all duration-300 group shadow-lg";
    const secondaryButtonClass = "inline-flex items-center gap-2 px-6 py-3 bg-dark-surface border border-dark-accent text-dark-accent font-bold rounded-full hover:bg-dark-accent hover:text-white hover:shadow-neon transition-all duration-300 group shadow-lg uppercase tracking-wider text-sm";

    const [heroRef, heroVisible] = useScrollAnimation();
    const [aboutRef, aboutVisible] = useScrollAnimation();
    const [storeRef, storeVisible] = useScrollAnimation();
    const [postsRef, postsVisible] = useScrollAnimation();

    return (
        <div className="space-y-16 md:space-y-32 pb-0 bg-dark-bg">
            {/* Hero Section */}
            <section ref={heroRef} className={`min-h-[80vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden fade-in-up ${heroVisible ? 'visible' : ''}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dark-accent/20 via-transparent to-transparent opacity-40 pointer-events-none animate-pulse-glow"></div>
                <div className="container mx-auto max-w-4xl relative z-10">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-lg animate-slide-up tracking-tighter">
                        FactsnReel
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-dark-muted mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Unveiling the unknown. Curating the exceptional.
                    </p>
                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link to="/posts" state={{ fromExploreNow: true }} className={buttonClass}>
                            Explore Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className={`container mx-auto px-4 fade-in-up ${aboutVisible ? 'visible' : ''}`}>
                <div className="bg-dark-surface/50 backdrop-blur-sm border border-dark-border rounded-2xl p-8 md:p-12 text-center max-w-5xl mx-auto shadow-glass hover:border-dark-accent transition-colors duration-500">
                    <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">{aboutData.title}</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                        {aboutData.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {aboutData.points.map((point, index) => (
                            <div key={index} className="bg-dark-bg/50 p-6 rounded-xl border border-dark-border hover:border-dark-accent hover:shadow-neon transition-all duration-300 group text-left hover-scale">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-dark-accent transition-colors">{point.title}</h3>
                                <p className="text-sm text-dark-muted">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Stories */}
            <section ref={postsRef} className={`container mx-auto px-4 fade-in-up ${postsVisible ? 'visible' : ''}`}>
                <div className="flex justify-between items-end mb-12 border-b border-dark-border pb-4">
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tight mb-2">Latest <span className="text-dark-accent">Posts</span></h2>
                        <p className="text-dark-muted">Fresh perspectives on the world around us.</p>
                    </div>
                    <Link to="/posts" className={`${secondaryButtonClass} hidden md:inline-flex`}>
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map(post => (
                        <PostCard key={post.id} post={post} onClick={handlePostClick} />
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link to="/posts" className={secondaryButtonClass}>
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Store Section */}
            <section ref={storeRef} className={`container mx-auto px-4 fade-in-up ${storeVisible ? 'visible' : ''}`}>
                <div className="flex justify-between items-end mb-12 border-b border-dark-border pb-4">
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tight mb-2">Curated <span className="text-dark-accent">Collection</span></h2>
                        <p className="text-dark-muted">Exclusive merchandise for the curious mind.</p>
                    </div>
                    <Link to="/store" className={`${secondaryButtonClass} hidden md:inline-flex`}>
                        Visit Store <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map(category => (
                        <CategoryCard key={category.id} category={category} variant="text" />
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link to="/store" className={secondaryButtonClass}>
                        Visit Store <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Contact Section */}
            <ContactSection />

            {/* Post Modal */}
            {selectedPost && (
                <PostModal post={selectedPost} onClose={closeModal} />
            )}
        </div>
    );
};

export default Home;
