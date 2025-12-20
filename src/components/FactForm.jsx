import { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, Info } from 'lucide-react';

const FactForm = ({ fact, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        fact: '',
        description: '',
        image: '',
        credit: '',
        reference: '',
        readMoreLink: '',
        buttonText: '',
        list: ['', '', '']
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (fact) {
            setFormData({
                ...fact,
                list: fact.list || ['', '', '']
            });
        }
    }, [fact]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const method = fact ? 'PUT' : 'POST';
        const url = fact ? `http://localhost:5000/api/facts/${fact.id}` : 'http://localhost:5000/api/facts';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': localStorage.getItem('adminPassword')
                },
                body: JSON.stringify({
                    ...formData,
                    list: formData.list.filter(item => item.trim() !== '')
                })
            });

            if (res.ok) {
                onSuccess();
            } else {
                const data = await res.json();
                alert(data.error || 'Operation failed');
            }
        } catch (err) {
            alert('Network error');
        } finally {
            setLoading(false);
        }
    };

    const handleListItemChange = (index, value) => {
        const newList = [...formData.list];
        newList[index] = value;
        setFormData({ ...formData, list: newList });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-dark-surface border border-dark-border w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-dark-border flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{fact ? 'Edit Fact' : 'New Fact'}</h2>
                    <button onClick={onClose} className="text-dark-muted hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
                    {/* Primary Content */}
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-dark-muted text-sm font-medium mb-1 block">The Fact (Heading)</span>
                            <textarea
                                value={formData.fact}
                                onChange={(e) => setFormData({ ...formData, fact: e.target.value })}
                                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent transition-all min-h-[80px]"
                                placeholder="e.g., Honey never spoils."
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-dark-muted text-sm font-medium mb-1 block">Description</span>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent transition-all min-h-[100px]"
                                placeholder="Explain the fact in detail..."
                                required
                            />
                        </label>
                    </div>

                    {/* Media & Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label>
                            <span className="text-dark-muted text-sm font-medium mb-1 block">Image URL</span>
                            <div className="relative">
                                <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent transition-all"
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                        </label>
                        <label>
                            <span className="text-dark-muted text-sm font-medium mb-1 block">Credit / Source Name</span>
                            <div className="relative">
                                <Info size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                                <input
                                    type="text"
                                    value={formData.credit}
                                    onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent transition-all"
                                    placeholder="e.g., NASA"
                                    required
                                />
                            </div>
                        </label>
                    </div>

                    {/* Key Points */}
                    <div className="bg-dark-bg/50 p-6 rounded-xl border border-dark-border">
                        <span className="text-dark-muted text-sm font-bold uppercase tracking-wider mb-4 block">Key Points (Brief)</span>
                        <div className="space-y-3">
                            {formData.list.map((item, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleListItemChange(index, e.target.value)}
                                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-dark-accent"
                                    placeholder={`Point ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Read More Integration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label>
                            <span className="text-dark-muted text-sm font-medium mb-1 block">External Reference Link</span>
                            <div className="relative">
                                <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted" />
                                <input
                                    type="text"
                                    value={formData.reference}
                                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent transition-all"
                                    placeholder="https://..."
                                />
                            </div>
                        </label>
                        <label>
                            <span className="text-dark-muted text-sm font-medium mb-1 block">Internal Read More Link</span>
                            <input
                                type="text"
                                value={formData.readMoreLink}
                                onChange={(e) => setFormData({ ...formData, readMoreLink: e.target.value })}
                                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent transition-all"
                                placeholder="/posts?postId=123"
                            />
                        </label>
                    </div>
                </form>

                <div className="p-6 border-t border-dark-border">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 bg-dark-accent text-white font-bold rounded-xl hover:shadow-neon transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Fact'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FactForm;
