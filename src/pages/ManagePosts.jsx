import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layers } from 'lucide-react';
import PostForm from '../components/PostForm';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/posts');
            const data = await res.json();
            setPosts(data.reverse()); // Show latest first
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post? All sub-posts (if any) will remain in the data but disconnected.')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-password': localStorage.getItem('adminPassword')
                }
            });
            if (res.ok) fetchPosts();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingPost(null);
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white">Manage <span className="text-dark-accent">Posts</span></h1>
                    <p className="text-dark-muted mt-1">Create and curate your blog content.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-dark-accent text-white font-bold rounded-xl hover:shadow-neon transition-all"
                >
                    <Plus size={20} />
                    <span>New Post</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-dark-muted italic">Loading posts...</div>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-dark-surface border border-dark-border p-4 rounded-xl flex flex-col md:flex-row items-center gap-6 group hover:border-dark-accent transition-colors">
                            <div className="relative">
                                <img src={post.image} alt="" className="w-32 h-24 object-cover rounded-lg border border-dark-border" />
                                {post.type === 'collection' && (
                                    <div className="absolute -top-2 -right-2 bg-dark-accent text-white p-1.5 rounded-full shadow-lg">
                                        <Layers size={14} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-white font-bold text-lg line-clamp-1">{post.title}</h3>
                                    {post.type === 'collection' && <span className="text-[10px] bg-dark-accent/20 text-dark-accent px-2 py-0.5 rounded-full font-bold">COLLECTION</span>}
                                </div>
                                <p className="text-dark-muted text-sm line-clamp-2 mt-1">{post.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="text-[10px] text-dark-accent font-bold uppercase tracking-wider">ID: {post.id}</span>
                                    <span className="text-[10px] text-dark-muted font-bold uppercase tracking-wider">Topic: {Array.isArray(post.topic) ? post.topic.join(', ') : post.topic}</span>
                                    {post.subPosts && <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">{post.subPosts.length} Sub-posts</span>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="p-2 bg-dark-bg text-dark-muted hover:text-dark-accent hover:bg-dark-accent/10 rounded-lg transition-all"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
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
                <PostForm
                    post={editingPost}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={() => {
                        setIsFormOpen(false);
                        fetchPosts();
                    }}
                />
            )}
        </div>
    );
};

export default ManagePosts;
