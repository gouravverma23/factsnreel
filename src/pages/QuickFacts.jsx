import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import FactCard from '../components/FactCard';
import FactCardSkeleton from '../components/FactCardSkeleton';
import { facts as staticFacts } from '../data/facts';

const QuickFacts = () => {
    const [displayFacts, setDisplayFacts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const observer = useRef();

    // Batched shuffle algorithm
    const getBatchedShuffledFacts = useCallback(() => {
        const sorted = [...staticFacts].sort((a, b) => b.id - a.id);
        const batched = [];
        for (let i = 0; i < sorted.length; i += 9) {
            const batch = sorted.slice(i, i + 9);
            // Shuffle the batch
            const shuffledBatch = [...batch].sort(() => Math.random() - 0.5);
            batched.push(...shuffledBatch);
        }
        return batched;
    }, []);

    const [allFacts] = useState(() => getBatchedShuffledFacts());

    useEffect(() => {
        // Initial load
        setDisplayFacts(allFacts.slice(0, visibleCount));
        setLoading(false);
    }, [allFacts]);

    const lastFactElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && visibleCount < allFacts.length) {
                loadMore();
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, visibleCount, allFacts.length]);

    const loadMore = () => {
        setLoadingMore(true);
        // Simulate a small delay for better UX
        setTimeout(() => {
            const nextCount = visibleCount + 9;
            setVisibleCount(nextCount);
            setDisplayFacts(allFacts.slice(0, nextCount));
            setLoadingMore(false);
        }, 600);
    };

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
                    <>
                        {displayFacts.map((fact, index) => {
                            if (displayFacts.length === index + 1) {
                                return (
                                    <div ref={lastFactElementRef} key={fact.id}>
                                        <FactCard fact={fact} />
                                    </div>
                                );
                            } else {
                                return <FactCard key={fact.id} fact={fact} />;
                            }
                        })}

                        {loadingMore && (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 text-dark-accent animate-spin" />
                            </div>
                        )}

                        {!loadingMore && visibleCount >= allFacts.length && (
                            <p className="text-center text-dark-muted py-8 italic">
                                You've reached the end of our facts. Check back later for more!
                            </p>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default QuickFacts;
