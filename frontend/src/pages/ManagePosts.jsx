import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layers, FileText } from 'lucide-react';

import PostForm from '../components/PostForm';
import { deletePost, getPosts } from '../lib/api';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data.reverse());
        } catch (err) {
            console.error(err);
            setFeedback({ type: 'error', text: 'Unable to load posts right now.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await deletePost(id);
            setFeedback({ type: 'success', text: 'Post deleted successfully.' });
            fetchPosts();
        } catch (err) {
            setFeedback({ type: 'error', text: err.message || 'Failed to delete post.' });
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
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-black text-white">Manage <span className="text-dark-accent">Posts</span></h1>
                    <p className="mt-1 text-dark-muted">Create, edit, and organize long-form content for the website.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 rounded-xl bg-dark-accent px-6 py-3 font-bold text-white transition-all hover:shadow-neon"
                >
                    <Plus size={20} />
                    <span>New Post</span>
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
                <div className="py-20 text-center italic text-dark-muted">Loading posts...</div>
            ) : posts.length === 0 ? (
                <div className="rounded-2xl border border-dark-border bg-dark-surface p-10 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-dark-accent/10">
                        <FileText className="text-dark-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">No posts published yet</h2>
                    <p className="mx-auto mt-3 max-w-xl text-dark-muted">
                        Start by creating your first post or collection. It will be stored in MongoDB and loaded directly by the website.
                    </p>
                    <button
                        onClick={handleAdd}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-dark-accent px-6 py-3 font-bold text-white transition-all hover:shadow-neon"
                    >
                        <Plus size={18} />
                        Create First Post
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="group flex flex-col gap-6 rounded-2xl border border-dark-border bg-dark-surface p-4 transition-colors hover:border-dark-accent md:flex-row md:items-center">
                            <div className="relative">
                                <img src={post.image} alt={post.title} className="h-24 w-32 rounded-lg border border-dark-border object-cover" />
                                {post.type === 'collection' && (
                                    <div className="absolute -right-2 -top-2 rounded-full bg-dark-accent p-1.5 text-white shadow-lg">
                                        <Layers size={14} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="line-clamp-1 text-lg font-bold text-white">{post.title}</h3>
                                    {post.type === 'collection' && (
                                        <span className="rounded-full bg-dark-accent/20 px-2 py-0.5 text-[10px] font-bold text-dark-accent">
                                            COLLECTION
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm text-dark-muted">{post.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark-accent">ID: {post.id}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark-muted">
                                        Topic: {Array.isArray(post.topic) ? post.topic.join(', ') : post.topic}
                                    </span>
                                    {post.subPosts?.length > 0 && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">
                                            {post.subPosts.length} Sub-posts
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(post)}
                                    className="rounded-lg bg-dark-bg p-2 text-dark-muted transition-all hover:bg-dark-accent/10 hover:text-dark-accent"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
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
                <PostForm
                    post={editingPost}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={(message) => {
                        setIsFormOpen(false);
                        setFeedback({ type: 'success', text: message || 'Post saved successfully.' });
                        fetchPosts();
                    }}
                />
            )}
        </div>
    );
};

export default ManagePosts;
