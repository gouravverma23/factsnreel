import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Lightbulb, Sparkles, ArrowRight, Layers } from 'lucide-react';

import { getFacts, getPosts } from '../lib/api';

const StatCard = ({ title, value, icon, accent }) => (
    <div className="rounded-2xl border border-dark-border bg-dark-surface p-6 shadow-xl">
        <div className={`mb-4 inline-flex rounded-xl ${accent} p-3`}>
            {icon}
        </div>
        <h3 className="text-sm font-medium uppercase tracking-wider text-dark-muted">{title}</h3>
        <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [postsData, factsData] = await Promise.all([
                    getPosts(),
                    getFacts(),
                ]);

                setPosts(postsData);
                setFacts(factsData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const recentPosts = useMemo(() => [...posts].reverse().slice(0, 4), [posts]);
    const recentFacts = useMemo(() => [...facts].reverse().slice(0, 4), [facts]);

    return (
        <div className="space-y-10">
            <section className="overflow-hidden rounded-[28px] border border-dark-border bg-dark-surface">
                <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="relative p-8 lg:p-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,200,0.14),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.1),_transparent_36%)]" />
                        <div className="relative">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dark-accent/30 bg-dark-accent/10 px-4 py-2 text-sm font-semibold text-dark-accent">
                                <Sparkles size={16} />
                                Content Studio
                            </div>
                            <h1 className="max-w-2xl text-4xl font-black text-white lg:text-5xl">
                                Publish new stories and facts without touching JSON files again.
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-dark-muted">
                                Use the admin panel to add full posts, build quick facts, edit existing content, and keep the live website updated through your MongoDB backend.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/admin/posts"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-dark-accent px-6 py-3 font-bold text-white transition-all hover:shadow-neon"
                                >
                                    Create Post
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    to="/admin/facts"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-dark-border bg-dark-bg/60 px-6 py-3 font-bold text-white transition-all hover:border-dark-accent"
                                >
                                    Create Fact
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-dark-border p-8 lg:border-l lg:border-t-0 lg:p-10">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-dark-muted">Publishing Snapshot</p>
                        <div className="grid gap-4">
                            <StatCard
                                title="Total Posts"
                                value={loading ? '...' : posts.length}
                                icon={<FileText className="text-cyan-300" />}
                                accent="bg-cyan-500/10"
                            />
                            <StatCard
                                title="Quick Facts"
                                value={loading ? '...' : facts.length}
                                icon={<Lightbulb className="text-amber-300" />}
                                accent="bg-amber-500/10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-2xl border border-dark-border bg-dark-surface p-7">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Recent Posts</h2>
                            <p className="mt-1 text-sm text-dark-muted">Your latest long-form content and collections.</p>
                        </div>
                        <Link to="/admin/posts" className="text-sm font-semibold text-dark-accent hover:text-white">
                            Manage
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentPosts.length === 0 && !loading ? (
                            <div className="rounded-xl border border-dark-border bg-dark-bg/50 p-5 text-sm text-dark-muted">
                                No posts yet. Open the post manager and publish your first one.
                            </div>
                        ) : recentPosts.map((post) => (
                            <div key={post.id} className="flex items-center gap-4 rounded-xl border border-dark-border bg-dark-bg/40 p-4">
                                <img src={post.image} alt={post.title} className="h-16 w-20 rounded-lg object-cover" />
                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <p className="truncate font-semibold text-white">{post.title}</p>
                                        {post.type === 'collection' && <Layers size={14} className="shrink-0 text-dark-accent" />}
                                    </div>
                                    <p className="line-clamp-2 text-sm text-dark-muted">{post.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-dark-border bg-dark-surface p-7">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Recent Facts</h2>
                            <p className="mt-1 text-sm text-dark-muted">The newest quick fact cards on the site.</p>
                        </div>
                        <Link to="/admin/facts" className="text-sm font-semibold text-dark-accent hover:text-white">
                            Manage
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentFacts.length === 0 && !loading ? (
                            <div className="rounded-xl border border-dark-border bg-dark-bg/50 p-5 text-sm text-dark-muted">
                                No facts yet. Open the fact manager and add your first card.
                            </div>
                        ) : recentFacts.map((fact) => (
                            <div key={fact.id} className="flex items-center gap-4 rounded-xl border border-dark-border bg-dark-bg/40 p-4">
                                <img src={fact.image} alt={fact.fact} className="h-16 w-16 rounded-lg object-cover" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-semibold text-white">{fact.fact}</p>
                                    <p className="mt-1 line-clamp-2 text-sm text-dark-muted">{fact.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
