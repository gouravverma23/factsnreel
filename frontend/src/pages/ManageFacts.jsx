import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Lightbulb } from 'lucide-react';

import FactForm from '../components/FactForm';
import { deleteFact, getFacts } from '../lib/api';

const ManageFacts = () => {
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFact, setEditingFact] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const fetchFacts = async () => {
        try {
            const data = await getFacts();
            setFacts(data.reverse());
        } catch (err) {
            console.error(err);
            setFeedback({ type: 'error', text: 'Unable to load facts right now.' });
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
            await deleteFact(id);
            setFeedback({ type: 'success', text: 'Fact deleted successfully.' });
            fetchFacts();
        } catch (err) {
            setFeedback({ type: 'error', text: err.message || 'Failed to delete fact.' });
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
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white">Manage <span className="text-dark-accent">Facts</span></h1>
                    <p className="mt-1 text-dark-muted">Add, update, and publish quick fact cards with source links.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 rounded-xl bg-dark-accent px-6 py-3 font-bold text-white transition-all hover:shadow-neon"
                >
                    <Plus size={20} />
                    <span>New Fact</span>
                </button>
            </div>

            {feedback && (
                <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${feedback.type === 'success'
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    : 'border-red-500/20 bg-red-500/10 text-red-300'
                    }`}>
                    {feedback.text}
                </div>
            )}

            {loading ? (
                <div className="py-20 text-center italic text-dark-muted">Loading facts...</div>
            ) : facts.length === 0 ? (
                <div className="rounded-2xl border border-dark-border bg-dark-surface p-10 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-dark-accent/10">
                        <Lightbulb className="text-dark-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">No facts published yet</h2>
                    <p className="mx-auto mt-3 max-w-xl text-dark-muted">
                        Add your first quick fact card here and it will appear on the facts page after save.
                    </p>
                    <button
                        onClick={handleAdd}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-dark-accent px-6 py-3 font-bold text-white transition-all hover:shadow-neon"
                    >
                        <Plus size={18} />
                        Create First Fact
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {facts.map((fact) => (
                        <div key={fact.id} className="group flex flex-col gap-6 rounded-2xl border border-dark-border bg-dark-surface p-4 transition-colors hover:border-dark-accent md:flex-row md:items-center">
                            <img src={fact.image} alt={fact.fact} className="h-24 w-24 rounded-lg border border-dark-border object-cover" />
                            <div className="flex-1">
                                <h3 className="line-clamp-1 text-lg font-bold text-white">{fact.fact}</h3>
                                <p className="mt-1 line-clamp-2 text-sm text-dark-muted">{fact.description}</p>
                                <div className="mt-2 flex flex-wrap gap-4">
                                    <span className="text-xs font-medium text-dark-accent">ID: {fact.id}</span>
                                    <span className="text-xs text-dark-muted">Credit: {fact.credit || 'Not set'}</span>
                                    {fact.readMoreLink && <span className="text-xs text-green-400">Linked to post</span>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(fact)}
                                    className="rounded-lg bg-dark-bg p-2 text-dark-muted transition-all hover:bg-dark-accent/10 hover:text-dark-accent"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(fact.id)}
                                    className="rounded-lg bg-dark-bg p-2 text-dark-muted transition-all hover:bg-red-400/10 hover:text-red-400"
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
                    onSuccess={(message) => {
                        setIsFormOpen(false);
                        setFeedback({ type: 'success', text: message || 'Fact saved successfully.' });
                        fetchFacts();
                    }}
                />
            )}
        </div>
    );
};

export default ManageFacts;
