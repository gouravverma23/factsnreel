import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Lightbulb, LogOut, ChevronRight } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const password = localStorage.getItem('adminPassword');
        if (!password) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminPassword');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Posts', path: '/admin/posts', icon: <FileText size={20} /> },
        { name: 'Manage Facts', path: '/admin/facts', icon: <Lightbulb size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-dark-surface border-b md:border-b-0 md:border-r border-dark-border p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-dark-accent rounded-lg flex items-center justify-center text-white font-bold">A</div>
                    <span className="text-xl font-bold text-white tracking-tight">Admin<span className="text-dark-accent">Panel</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${location.pathname === item.path
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
                    className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
