import { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Plus, Trash2, MessageSquare, List as ListIcon, Type } from 'lucide-react';

const PostForm = ({ post, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        topic: '',
        subtopics: '',
        type: 'post', // 'post' or 'collection'
        content: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (post) {
            setFormData({
                ...post,
                topic: Array.isArray(post.topic) ? post.topic.join(', ') : post.topic,
                subtopics: Array.isArray(post.subtopics) ? post.subtopics.join(', ') : post.subtopics,
                content: post.content || []
            });
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const method = post ? 'PUT' : 'POST';
        const url = post ? `http://localhost:5000/api/posts/${post.id}` : 'http://localhost:5000/api/posts';

        // Prepare data
        const body = {
            ...formData,
            topic: formData.topic.split(',').map(t => t.trim()).filter(t => t !== ''),
            subtopics: formData.subtopics.split(',').map(s => s.trim()).filter(s => s !== ''),
        };

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': localStorage.getItem('adminPassword')
                },
                body: JSON.stringify(body)
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

    const addContentBlock = (type) => {
        const newBlock = { type };
        if (type === 'heading' || type === 'subheading' || type === 'paragraph') newBlock.text = '';
        if (type === 'image') { newBlock.src = ''; newBlock.alt = ''; newBlock.caption = ''; }
        if (type === 'list') newBlock.items = [''];
        if (type === 'link') { newBlock.text = ''; newBlock.url = ''; }

        setFormData({ ...formData, content: [...formData.content, newBlock] });
    };

    const removeContentBlock = (index) => {
        const newContent = [...formData.content];
        newContent.splice(index, 1);
        setFormData({ ...formData, content: newContent });
    };

    const updateContentBlock = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index][field] = value;
        setFormData({ ...formData, content: newContent });
    };

    const updateListItem = (blockIndex, itemIndex, value) => {
        const newContent = [...formData.content];
        newContent[blockIndex].items[itemIndex] = value;
        setFormData({ ...formData, content: newContent });
    };

    const addListItem = (blockIndex) => {
        const newContent = [...formData.content];
        newContent[blockIndex].items.push('');
        setFormData({ ...formData, content: newContent });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-dark-surface border border-dark-border w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-dark-border flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">{post ? 'Edit Post' : 'New Post'}</h2>
                        <p className="text-dark-muted text-xs">Fill in post details and build content blocks.</p>
                    </div>
                    <button onClick={onClose} className="text-dark-muted hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-dark-muted text-sm font-medium mb-1 block">Post Title</span>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                                    placeholder="Enter Title"
                                    required
                                />
                            </label>
                            <label className="block">
                                <span className="text-dark-muted text-sm font-medium mb-1 block">Description</span>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent min-h-[100px]"
                                    placeholder="Short summary..."
                                    required
                                />
                            </label>
                        </div>
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-dark-muted text-sm font-medium mb-1 block">Cover Image URL</span>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                                    placeholder="https://..."
                                    required
                                />
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="block">
                                    <span className="text-dark-muted text-sm font-medium mb-1 block">Topic(s)</span>
                                    <input
                                        type="text"
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                                        placeholder="Tech, Science..."
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-dark-muted text-sm font-medium mb-1 block">Type</span>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                                    >
                                        <option value="post">Standard Post</option>
                                        <option value="collection">Collection Hub</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Content Builder */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Content Blocks</h3>
                            <div className="flex flex-wrap gap-2 text-[10px]">
                                <button type="button" onClick={() => addContentBlock('heading')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Heading</button>
                                <button type="button" onClick={() => addContentBlock('subheading')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Subheading</button>
                                <button type="button" onClick={() => addContentBlock('paragraph')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Paragraph</button>
                                <button type="button" onClick={() => addContentBlock('image')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Image</button>
                                <button type="button" onClick={() => addContentBlock('list')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">List</button>
                                <button type="button" onClick={() => addContentBlock('ad')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Ad Slot</button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {formData.content.map((block, index) => (
                                <div key={index} className="bg-dark-bg/50 p-6 rounded-xl border border-dark-border relative group">
                                    <button
                                        type="button"
                                        onClick={() => removeContentBlock(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    >
                                        <X size={12} />
                                    </button>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] bg-dark-accent text-white px-2 py-0.5 rounded font-black uppercase">{block.type}</span>
                                    </div>

                                    {(block.type === 'heading' || block.type === 'subheading' || block.type === 'paragraph') && (
                                        <textarea
                                            value={block.text}
                                            onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                                            className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-dark-accent"
                                            placeholder={`Enter ${block.type} text...`}
                                        />
                                    )}

                                    {block.type === 'image' && (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                value={block.src}
                                                onChange={(e) => updateContentBlock(index, 'src', e.target.value)}
                                                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                                                placeholder="Image URL"
                                            />
                                            <input
                                                type="text"
                                                value={block.caption}
                                                onChange={(e) => updateContentBlock(index, 'caption', e.target.value)}
                                                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-[10px] text-white"
                                                placeholder="Caption"
                                            />
                                        </div>
                                    )}

                                    {block.type === 'list' && (
                                        <div className="space-y-2">
                                            {block.items.map((item, iIndex) => (
                                                <input
                                                    key={iIndex}
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => updateListItem(index, iIndex, e.target.value)}
                                                    className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                                                    placeholder={`List item ${iIndex + 1}`}
                                                />
                                            ))}
                                            <button type="button" onClick={() => addListItem(index)} className="text-dark-accent text-[10px] font-bold">+ Add Item</button>
                                        </div>
                                    )}

                                    {block.type === 'ad' && (
                                        <div className="text-center py-4 border-2 border-dashed border-dark-border rounded text-dark-muted text-xs font-mono">
                                            [ AUTOMATIC ADVERTISEMENT SLOT ]
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </form>

                <div className="p-6 border-t border-dark-border bg-dark-surface">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 bg-dark-accent text-white font-bold rounded-xl hover:shadow-neon transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Publishing...' : 'Save and Publish Post'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
