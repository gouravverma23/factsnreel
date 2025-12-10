import { useEffect } from 'react';
import { X, ExternalLink, Shuffle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostModal = ({ post, onClose, onNextRandom, onNextPost, onPrevPost }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    // Reset scroll when post changes
    useEffect(() => {
        const contentDiv = document.getElementById('modal-content-scroll');
        if (contentDiv) contentDiv.scrollTop = 0;
    }, [post.id]);

    // Helper function to process text with simple markdown-like syntax
    const formatText = (text) => {
        if (!text) return null;
        // Split by **text** pattern
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    const handleViewMore = () => {
        if (post.topic) {
            const topicToUse = Array.isArray(post.topic) ? post.topic[0] : post.topic;
            navigate(`/posts?topic=${encodeURIComponent(topicToUse)}`);
            window.scrollTo(0, 0);
        } else {
            navigate('/posts');
        }
    };

    if (!post) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-dark-surface border border-dark-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-slide-up overflow-hidden">

                {/* Fixed Header with Close Button */}
                <div className="absolute top-0 right-0 left-0 z-20 p-4 flex justify-end pointer-events-none">
                    <button
                        onClick={onClose}
                        className="p-2 bg-black/50 rounded-full text-white hover:bg-dark-accent transition-colors pointer-events-auto backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Unified Scrollable Container */}
                <div id="modal-content-scroll" className="overflow-y-auto custom-scrollbar flex-grow">

                    {/* Image Section - Scrolls with content */}
                    <div className="w-full h-64 md:h-80 relative shrink-0">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent opacity-80" />
                    </div>

                    {/* Content Section */}
                    <div className="p-5 md:p-8 -mt-12 relative z-10">
                        {/* Top Header Section - Enhanced Visibility & Alignment */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:pr-12">
                            <div className="flex-1">
                                {post.topic && (
                                    Array.isArray(post.topic) ? (
                                        <div className="flex flex-wrap gap-2">
                                            {post.topic.slice(0, 2).map((t, i) => (
                                                <span key={i} className="inline-block px-3 py-1 text-xs font-bold text-dark-accent bg-dark-accent/10 rounded-full backdrop-blur-md border border-dark-accent/20">
                                                    {t}
                                                </span>
                                            ))}
                                            {post.topic.length > 2 && (
                                                <span className="inline-block px-3 py-1 text-xs font-bold text-dark-muted bg-dark-surface rounded-full backdrop-blur-md border border-dark-border/50">
                                                    +{post.topic.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="inline-block px-3 py-1 text-xs font-bold text-dark-accent bg-dark-accent/10 rounded-full backdrop-blur-md border border-dark-accent/20">
                                            {post.topic}
                                        </span>
                                    )
                                )}
                            </div>

                            {onNextRandom && (
                                <button
                                    onClick={onNextRandom}
                                    className="self-end md:self-auto flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full hover:shadow-neon hover:scale-105 transition-all duration-300 group whitespace-nowrap md:ml-4 shadow-lg"
                                >
                                    Next Random <Shuffle size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                                </button>
                            )}
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-dark-accent to-purple-600 mb-8 rounded-full" />

                        <div className="prose prose-invert max-w-none text-gray-300 mb-12">
                            <p className="text-xl leading-relaxed font-medium mb-6 text-gray-100">{formatText(post.description)}</p>

                            {post.content && post.content.map((block, index) => {
                                if (block.type === 'paragraph') {
                                    return (
                                        <p key={index} className="mb-4 text-base leading-relaxed text-gray-300">
                                            {formatText(block.text)}
                                        </p>
                                    );
                                } else if (block.type === 'list') {
                                    return (
                                        <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-base text-gray-300 ml-4">
                                            {block.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>{formatText(item)}</li>
                                            ))}
                                        </ul>
                                    );
                                } else if (block.type === 'heading') {
                                    return (
                                        <h3 key={index} className="text-2xl font-bold text-white mb-4 mt-8">
                                            {block.text}
                                        </h3>
                                    );
                                } else if (block.type === 'subheading') {
                                    return (
                                        <h4 key={index} className="text-lg font-bold text-dark-accent mb-3 mt-6">
                                            {block.text}
                                        </h4>
                                    );
                                } else if (block.type === 'image') {
                                    return (
                                        <figure key={index} className="my-8">
                                            <img src={block.src} alt={block.alt} className="w-full rounded-2xl shadow-xl border border-dark-border/50" />
                                            {block.caption && <figcaption className="text-center text-xs text-dark-muted mt-3 italic">{block.caption}</figcaption>}
                                        </figure>
                                    );
                                } else if (block.type === 'ad') {
                                    return (
                                        <div key={index} className="my-8 p-8 bg-dark-bg/50 border border-dark-border border-dashed rounded-xl flex flex-col items-center justify-center text-dark-muted">
                                            <span className="text-[10px] uppercase tracking-widest mb-2 opacity-50">Advertisement</span>
                                            <div className="w-full h-32 bg-dark-surface rounded-lg flex items-center justify-center">
                                                <span className="text-sm">Sponsored Content Space</span>
                                            </div>
                                        </div>
                                    );
                                } else if (block.type === 'link') {
                                    return (
                                        <a key={index} href={block.url} target="_blank" rel="noopener noreferrer" className="block my-6 p-5 bg-dark-surface/50 border border-dark-border rounded-xl hover:border-dark-accent hover:bg-dark-surface transition-all group">
                                            <div className="flex items-center justify-between">
                                                <span className="text-dark-accent font-bold text-sm group-hover:underline">{block.text}</span>
                                                <ExternalLink size={16} className="text-dark-muted group-hover:text-dark-accent" />
                                            </div>
                                        </a>
                                    );
                                }
                                return null;
                            })}

                            {post.subtopics && post.subtopics.length > 0 && (
                                <div className="mb-6 mt-8 p-6 bg-dark-bg/30 rounded-xl border border-dark-border/50">
                                    <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Related Topics</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.subtopics.map((sub, index) => (
                                            <span key={index} className="px-3 py-1.5 bg-dark-surface border border-dark-border rounded-full text-xs text-gray-400 hover:text-white hover:border-dark-accent transition-colors cursor-default">
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {post.references && post.references.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-dark-border">
                                    <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">References</h4>
                                    <ul className="space-y-2">
                                        {post.references.map((ref, index) => (
                                            <li key={index}>
                                                <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-xs text-dark-muted hover:text-dark-accent transition-colors flex items-center gap-2 group">
                                                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                                    {ref.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions - Inside Scroll */}
                        <div className="pt-6 border-t border-dark-border flex flex-col gap-4">
                            {onNextRandom && (
                                <button
                                    onClick={onNextRandom}
                                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-black rounded-2xl shadow-lg hover:shadow-neon hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 group animate-pulse-slow"
                                >
                                    <Shuffle size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                                    NEXT RANDOM
                                </button>
                            )}

                            {(onNextPost || onPrevPost) && (
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={onPrevPost}
                                        disabled={!onPrevPost}
                                        className={`py-4 bg-dark-surface border border-dark-border text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${!onPrevPost ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-border hover:scale-[1.02]'}`}
                                    >
                                        <ArrowLeft size={20} /> Previous
                                    </button>
                                    <button
                                        onClick={onNextPost}
                                        disabled={!onNextPost}
                                        className={`py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${!onNextPost ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-neon hover:scale-[1.02]'}`}
                                    >
                                        Next <ArrowRight size={20} />
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={handleViewMore}
                                className="w-full py-4 bg-dark-surface border border-dark-accent/30 text-dark-accent font-bold rounded-xl hover:bg-dark-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Explore Related Topics
                            </button>

                            <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-dark-border/50">
                                <button
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="p-3 text-gray-400 hover:text-[#1877F2] transition-colors"
                                    title="Share on Facebook"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </button>
                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                    className="p-3 text-gray-400 hover:text-[#1DA1F2] transition-colors"
                                    title="Share on Twitter"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                </button>
                                <button
                                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${window.location.href}`)}`, '_blank')}
                                    className="p-3 text-gray-400 hover:text-[#25D366] transition-colors"
                                    title="Share on WhatsApp"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
