import { motion } from 'framer-motion';
import { ArrowRight, Quote, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FactCard = ({ fact }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden shadow-2xl relative"
        >
            {/* Image Section */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <img
                    src={fact.image}
                    alt={fact.fact}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6">
                    <span className="inline-block px-3 py-1 bg-dark-accent/20 text-dark-accent text-xs font-bold rounded-full border border-dark-accent/30 backdrop-blur-md">
                        DID YOU KNOW?
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 -mt-6 relative z-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                    {fact.fact}
                </h2>

                <div className="w-16 h-1 bg-gradient-to-r from-dark-accent to-purple-600 rounded-full mb-6" />

                <div className="max-w-none text-gray-300 space-y-4">
                    <p className="text-lg leading-relaxed font-medium text-white/90">
                        {fact.description}
                    </p>

                    {fact.list && fact.list.length > 0 && (
                        <div className="bg-dark-bg/50 rounded-xl p-6 border border-dark-border/50 my-6">
                            <h4 className="text-sm font-bold text-dark-muted uppercase tracking-wider mb-4">Key Points</h4>
                            <ul className="space-y-3">
                                {fact.list.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-dark-accent mt-2 shrink-0" />
                                        <span className="text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer Section: Source & link */}
                <div className="mt-8 pt-6 border-t border-dark-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-sm text-dark-muted">
                            <Quote size={14} className="text-dark-accent" />
                            Source: <span className="text-white font-medium">{fact.credit}</span>
                        </span>
                        {fact.reference && (
                            <a
                                href={fact.reference}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-dark-muted hover:text-dark-accent transition-colors flex items-center gap-1 w-fit"
                            >
                                <ExternalLink size={10} /> Verify Source
                            </a>
                        )}
                    </div>

                    {fact.readMoreLink && (
                        <button
                            onClick={() => navigate(fact.readMoreLink, { state: { modal: true } })}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-5 md:py-2 bg-dark-accent text-white font-bold rounded-xl md:rounded-lg hover:bg-white hover:text-dark-accent hover:shadow-neon transition-all duration-300 group shadow-lg w-full md:w-auto mt-4 md:mt-0 md:text-sm"
                        >
                            {fact.buttonText || 'Read Full Detailed Post'}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-4 md:h-4" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default FactCard;
