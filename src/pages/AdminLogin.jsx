import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // The password we set in the backend for now
        const ADMIN_PASSWORD = 'factsnreel-admin-2024';

        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminPassword', password);
            navigate('/admin');
        } else {
            setError('Invalid master password. ACCESS DENIED.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
            <div className="max-w-md w-full bg-dark-surface border border-dark-border p-8 rounded-2xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-accent/10 rounded-full mb-4">
                        <Lock className="text-dark-accent" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white">Admin Access</h1>
                    <p className="text-dark-muted mt-2">Enter master key to unlock dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Master Password"
                            className="w-full px-4 py-4 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-dark-accent text-white font-bold rounded-xl hover:shadow-neon transition-all"
                    >
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
