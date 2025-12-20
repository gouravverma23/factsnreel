import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import FactForm from '../components/FactForm';

const ManageFacts = () => {
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFact, setEditingFact] = useState(null);

    const fetchFacts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/facts');
            const data = await res.json();
            setFacts(data.reverse()); // Show latest first
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this fact?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/facts/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-password': localStorage.getItem('adminPassword')
                }
            });
            if (res.ok) fetchFacts();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleEdit = (fact) => {
        setEditingFact(fact);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingFact(null);
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white">Manage <span className="text-dark-accent">Facts</span></h1>
                    <p className="text-dark-muted mt-1">Add, update, or remove quick fact cards.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-dark-accent text-white font-bold rounded-xl hover:shadow-neon transition-all"
                >
                    <Plus size={20} />
                    <span>New Fact</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-dark-muted italic">Loading facts...</div>
            ) : (
                <div className="grid gap-4">
                    {facts.map((fact) => (
                        <div key={fact.id} className="bg-dark-surface border border-dark-border p-4 rounded-xl flex flex-col md:flex-row items-center gap-6 group hover:border-dark-accent transition-colors">
                            <img src={fact.image} alt="" className="w-24 h-24 object-cover rounded-lg border border-dark-border" />
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg line-clamp-1">{fact.fact}</h3>
                                <p className="text-dark-muted text-sm line-clamp-2 mt-1">{fact.description}</p>
                                <div className="flex gap-4 mt-2">
                                    <span className="text-xs text-dark-accent font-medium">ID: {fact.id}</span>
                                    <span className="text-xs text-dark-muted">Credit: {fact.credit}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(fact)}
                                    className="p-2 bg-dark-bg text-dark-muted hover:text-dark-accent hover:bg-dark-accent/10 rounded-lg transition-all"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(fact.id)}
                                    className="p-2 bg-dark-bg text-dark-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <FactForm
                    fact={editingFact}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={() => {
                        setIsFormOpen(false);
                        fetchFacts();
                    }}
                />
            )}
        </div>
    );
};

export default ManageFacts;
