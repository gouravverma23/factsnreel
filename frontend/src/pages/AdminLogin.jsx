import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';

import { loginAdmin } from '../lib/adminAuth';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await loginAdmin(password);
            navigate('/admin');
        } catch (loginError) {
            setError(loginError.message || 'Invalid admin password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg px-4 py-10">
            <div className="mx-auto grid min-h-[80vh] max-w-5xl overflow-hidden rounded-[28px] border border-dark-border bg-dark-surface shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative flex flex-col justify-between overflow-hidden border-b border-dark-border p-8 lg:border-b-0 lg:border-r lg:p-12">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,200,0.16),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_38%)]" />
                    <div className="relative">
                        <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-dark-accent/30 bg-dark-accent/10 px-4 py-2 text-sm font-semibold text-dark-accent">
                            <ShieldCheck size={16} />
                            FactsnReel Admin
                        </div>
                        <h1 className="max-w-md text-4xl font-black leading-tight text-white lg:text-5xl">
                            Publish new posts and quick facts from one place.
                        </h1>
                        <p className="mt-6 max-w-lg text-base leading-7 text-dark-muted">
                            This panel is now connected to your backend, so everything you publish here goes straight into MongoDB and shows up on the website.
                        </p>
                    </div>

                    <div className="relative grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-dark-border bg-dark-bg/60 p-5">
                            <p className="text-sm font-semibold text-white">Posts</p>
                            <p className="mt-2 text-sm text-dark-muted">Create story posts, collection hubs, content blocks, links, and references.</p>
                        </div>
                        <div className="rounded-2xl border border-dark-border bg-dark-bg/60 p-5">
                            <p className="text-sm font-semibold text-white">Facts</p>
                            <p className="mt-2 text-sm text-dark-muted">Publish quick fact cards with source credits, key points, and read-more links.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-8 lg:p-12">
                    <div className="w-full">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-dark-accent/10">
                                <Lock className="text-dark-accent" size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-white">Admin Login</h2>
                            <p className="mt-2 text-dark-muted">Enter your backend admin password to open the content panel.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-dark-muted">Admin password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="w-full rounded-xl border border-dark-border bg-dark-bg px-4 py-4 text-white transition-all focus:border-dark-accent focus:outline-none focus:ring-1 focus:ring-dark-accent"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-dark-accent py-4 font-bold text-white transition-all hover:shadow-neon disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? 'Verifying Access...' : 'Open Admin Panel'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
