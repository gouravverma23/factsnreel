import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Lightbulb, LogOut, ChevronRight, LoaderCircle } from 'lucide-react';

import {
    clearStoredAdminPassword,
    verifyAdminSession,
} from '../lib/adminAuth';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            try {
                await verifyAdminSession();
                setCheckingSession(false);
            } catch {
                navigate('/admin/login', { replace: true });
            }
        };

        validateSession();
    }, [navigate]);

    const handleLogout = () => {
        clearStoredAdminPassword().finally(() => {
            navigate('/admin/login');
        });
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Posts', path: '/admin/posts', icon: <FileText size={20} /> },
        { name: 'Manage Facts', path: '/admin/facts', icon: <Lightbulb size={20} /> },
    ];

    if (checkingSession) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-dark-bg px-4">
                <div className="rounded-2xl border border-dark-border bg-dark-surface px-8 py-10 text-center shadow-xl">
                    <LoaderCircle className="mx-auto mb-4 animate-spin text-dark-accent" size={30} />
                    <p className="font-semibold text-white">Checking admin session...</p>
                    <p className="mt-2 text-sm text-dark-muted">Making sure your dashboard access is still valid.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col md:flex-row">
            <div className="w-full md:w-72 bg-dark-surface border-b md:border-b-0 md:border-r border-dark-border p-6 flex flex-col">
                <div className="mb-10 rounded-2xl border border-dark-border bg-dark-bg/60 p-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark-accent font-bold text-white">A</div>
                        <div>
                            <p className="text-lg font-bold text-white">Admin Panel</p>
                            <p className="text-xs uppercase tracking-[0.22em] text-dark-muted">FactsnReel CMS</p>
                        </div>
                    </div>
                    <p className="text-sm text-dark-muted">Manage stories and quick facts that appear on the live website.</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-all ${location.pathname === item.path
                                ? 'bg-dark-accent text-white shadow-neon'
                                : 'text-dark-muted hover:bg-dark-border/30 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <ChevronRight size={16} className={`transition-transform ${location.pathname === item.path ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-10 flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-400 transition-all hover:bg-red-400/10"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
