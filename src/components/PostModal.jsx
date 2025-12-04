import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

const PostModal = ({ post, onClose }) => {
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

    if (!post) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-dark-surface border border-dark-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slide-up flex flex-col md:flex-row">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-dark-accent transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="mb-2">
                        {post.topic && (
                            <span className="inline-block px-3 py-1 text-xs font-bold text-dark-accent bg-dark-accent/10 rounded-full mb-2">
                                {post.topic}
                            </span>
                        )}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>
                    <div className="w-16 h-1 bg-dark-accent mb-6 rounded-full" />

                    <div className="prose prose-invert max-w-none text-gray-300 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-lg leading-relaxed font-medium mb-4">{post.description}</p>

                        {post.content && post.content.map((block, index) => {
                            if (block.type === 'paragraph') {
                                return (
                                    <p key={index} className="mb-4 text-sm leading-relaxed text-dark-muted">
                                        {block.text}
                                    </p>
                                );
                            } else if (block.type === 'list') {
                                return (
                                    <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-sm text-dark-muted">
                                        {block.items.map((item, itemIndex) => (
                                            <li key={itemIndex}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            } else if (block.type === 'heading') {
                                return (
                                    <h3 key={index} className="text-2xl font-bold text-white mb-3 mt-6">
                                        {block.text}
                                    </h3>
                                );
                            } else if (block.type === 'subheading') {
                                return (
                                    <h4 key={index} className="text-lg font-bold text-dark-accent mb-2 mt-4">
                                        {block.text}
                                    </h4>
                                );
                            } else if (block.type === 'image') {
                                return (
                                    <figure key={index} className="my-6">
                                        <img src={block.src} alt={block.alt} className="w-full rounded-xl shadow-lg" />
                                        {block.caption && <figcaption className="text-center text-xs text-dark-muted mt-2 italic">{block.caption}</figcaption>}
                                    </figure>
                                );
                            } else if (block.type === 'ad') {
                                return (
                                    <div key={index} className="my-6 p-6 bg-dark-bg/50 border border-dark-border border-dashed rounded-xl flex flex-col items-center justify-center text-dark-muted">
                                        <span className="text-[10px] uppercase tracking-widest mb-2 opacity-50">Advertisement</span>
                                        <div className="w-full h-24 bg-dark-surface rounded-lg flex items-center justify-center">
                                            <span className="text-xs">Google Ad Space</span>
                                        </div>
                                    </div>
                                );
                            } else if (block.type === 'link') {
                                return (
                                    <a key={index} href={block.url} target="_blank" rel="noopener noreferrer" className="block my-4 p-4 bg-dark-surface border border-dark-border rounded-lg hover:border-dark-accent transition-all group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-dark-accent font-medium text-sm group-hover:underline">{block.text}</span>
                                            <ExternalLink size={14} className="text-dark-muted group-hover:text-dark-accent" />
                                        </div>
                                    </a>
                                );
                            }
                            return null;
                        })}

                        {post.subtopics && post.subtopics.length > 0 && (
                            <div className="mb-4 mt-6">
                                <h4 className="text-white font-bold mb-2">Key Topics:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {post.subtopics.map((sub, index) => (
                                        <span key={index} className="px-2 py-1 bg-dark-surface border border-dark-border rounded text-xs text-gray-400">
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
                                                <ExternalLink size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                                {ref.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-dark-border flex flex-col gap-4">
                        <button className="w-full py-3 bg-dark-accent text-white font-bold rounded-lg hover:bg-white hover:text-dark-accent hover:shadow-neon transition-all duration-300">
                            view more
                        </button>

                        <div className="flex gap-2">
                            <button
                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                className="flex-1 p-3 border border-dark-border rounded-lg text-white hover:border-[#1877F2] hover:text-[#1877F2] transition-colors flex items-center justify-center gap-2"
                                title="Share on Facebook"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                <span className="hidden sm:inline">Facebook</span>
                            </button>
                            <button
                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                className="flex-1 p-3 border border-dark-border rounded-lg text-white hover:border-[#1DA1F2] hover:text-[#1DA1F2] transition-colors flex items-center justify-center gap-2"
                                title="Share on Twitter"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                <span className="hidden sm:inline">Twitter</span>
                            </button>
                            <button
                                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${window.location.href}`)}`, '_blank')}
                                className="flex-1 p-3 border border-dark-border rounded-lg text-white hover:border-[#25D366] hover:text-[#25D366] transition-colors flex items-center justify-center gap-2"
                                title="Share on WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                <span className="hidden sm:inline">WhatsApp</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
