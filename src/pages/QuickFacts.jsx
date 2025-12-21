import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FactCard from '../components/FactCard';
import FactCardSkeleton from '../components/FactCardSkeleton';
import { facts as staticFacts } from '../data/facts';

const QuickFacts = () => {
    const [shuffledFacts, setShuffledFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const shuffled = [...staticFacts].sort(() => Math.random() - 0.5);
        setShuffledFacts(shuffled);
        setLoading(false);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-dark-surface border border-dark-border rounded-full text-dark-accent font-bold mb-6 text-sm"
                >
                    <Sparkles size={16} />
                    <span>DAILY DOSE OF KNOWLEDGE</span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                    Quick <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark-accent to-purple-500">Facts</span>
                </h1>
                <p className="text-xl text-dark-muted">
                    Bite-sized knowledge to feed your curiosity. Click on any card to learn more.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-md mx-auto flex flex-col gap-8"
            >
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <FactCardSkeleton key={i} />
                    ))
                ) : error ? (
                    <div className="text-center py-20 bg-dark-surface border border-dark-border rounded-2xl p-8">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-dark-accent text-white rounded-full font-bold hover:shadow-neon transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    shuffledFacts.map((fact) => (
                        <FactCard
                            key={fact.id}
                            fact={fact}
                        />
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default QuickFacts;
