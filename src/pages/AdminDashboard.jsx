import { useState, useEffect } from 'react';
import { FileText, Lightbulb, TrendingUp, Users } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-dark-surface border border-dark-border p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
                {icon}
            </div>
        </div>
        <h3 className="text-dark-muted font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({ posts: 0, facts: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [postsRes, factsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/posts'),
                    fetch('http://localhost:5000/api/facts')
                ]);
                const posts = await postsRes.json();
                const facts = await factsRes.json();
                setStats({ posts: posts.length, facts: facts.length });
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white mb-2">Welcome Back, <span className="text-dark-accent">Admin</span></h1>
                <p className="text-dark-muted text-lg">Here's what's happening with FactsnReel today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    title="Total Posts"
                    value={loading ? '...' : stats.posts}
                    icon={<FileText className="text-blue-500" />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Quick Facts"
                    value={loading ? '...' : stats.facts}
                    icon={<Lightbulb className="text-yellow-500" />}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Site Traffic"
                    value="1.2k"
                    icon={<TrendingUp className="text-green-500" />}
                    color="bg-green-500"
                />
                <StatCard
                    title="Active Users"
                    value="48"
                    icon={<Users className="text-purple-500" />}
                    color="bg-purple-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark-surface border border-dark-border rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 text-dark-muted border-l-2 border-dark-accent pl-4">
                                <div>
                                    <p className="text-white font-medium">System Update</p>
                                    <p className="text-sm">Backend CRUD modules deployed successfully.</p>
                                </div>
                                <span className="ml-auto text-xs">2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-dark-accent/10 rounded-full flex items-center justify-center mb-6">
                        <TrendingUp className="text-dark-accent" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Ready to Grow?</h2>
                    <p className="text-dark-muted mb-6">Start adding new content to engage your audience and boost your reach.</p>
                    <button className="px-8 py-3 bg-dark-accent text-white font-bold rounded-xl hover:shadow-neon transition-all">
                        Create New Content
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
