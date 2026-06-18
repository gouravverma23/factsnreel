import { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FactModal = ({ fact, onClose }) => {
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

    if (!fact) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-dark-surface border border-dark-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-up overflow-hidden">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-dark-accent transition-colors pointer-events-auto backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                <div className="overflow-y-auto custom-scrollbar flex-grow">
                    {/* Image Header */}
                    <div className="w-full h-64 relative shrink-0">
                        <img
                            src={fact.image}
                            alt="Fact"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-8 -mt-12 relative z-10">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-dark-accent/20 text-dark-accent text-xs font-bold rounded-full border border-dark-accent/30 mb-4">
                                DID YOU KNOW?
                            </span>
                            <h2 className="text-3xl font-black text-white leading-tight mb-4">
                                {fact.fact}
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-dark-accent to-purple-600 rounded-full" />
                        </div>

                        <div className="space-y-6 text-gray-300">
                            <p className="text-lg leading-relaxed font-medium text-white/90">
                                {fact.description}
                            </p>

                            {fact.list && fact.list.length > 0 && (
                                <div className="bg-dark-bg/50 rounded-xl p-6 border border-dark-border/50">
                                    {fact.listName !== "" && (
                                        <h4 className="text-sm font-bold text-dark-muted uppercase tracking-wider mb-4">
                                            {fact.listName || 'Key Points'}
                                        </h4>
                                    )}
                                    <ul className="space-y-3">
                                        {fact.list.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-dark-accent mt-2 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Reference & Credit */}
                            <div className="flex items-center justify-between pt-6 border-t border-dark-border/50 text-sm text-dark-muted">
                                <span className="flex items-center gap-2">
                                    <Quote size={14} className="text-dark-accent" />
                                    Source: <span className="text-white">{fact.credit}</span>
                                </span>
                                {fact.reference && (
                                    <a
                                        href={fact.reference}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:text-dark-accent transition-colors"
                                    >
                                        Verify <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Read More Button */}
                        {fact.readMoreLink && (
                            <div className="mt-8 pt-6 border-t border-dark-border">
                                <button
                                    onClick={() => navigate(fact.readMoreLink)}
                                    className="w-full py-4 bg-dark-accent text-white font-bold rounded-xl hover:bg-white hover:text-dark-accent hover:shadow-neon transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    {fact.buttonText || 'Read Full Detailed Post'}
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FactModal;
