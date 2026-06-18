import { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { createPost, updatePost } from '../lib/api';

const emptyReference = { text: '', url: '' };
const emptySubPost = {
    title: '',
    description: '',
    image: '',
    topic: '',
    subtopics: '',
    type: 'post',
    content: [],
    references: [{ ...emptyReference }],
};

const normalizeReferenceInputs = (references = []) => (
    references.length ? references : [{ ...emptyReference }]
);

const stringifyTagField = (value) => (
    Array.isArray(value) ? value.join(', ') : (value || '')
);

const formatSubPostForForm = (subPost = {}) => ({
    ...emptySubPost,
    ...subPost,
    topic: stringifyTagField(subPost.topic),
    subtopics: stringifyTagField(subPost.subtopics),
    content: Array.isArray(subPost.content) ? subPost.content : [],
    references: normalizeReferenceInputs(subPost.references),
});

const buildPostPayload = (data) => ({
    ...data,
    topic: String(data.topic || '').split(',').map((item) => item.trim()).filter(Boolean),
    subtopics: String(data.subtopics || '').split(',').map((item) => item.trim()).filter(Boolean),
    references: (data.references || [])
        .map((reference) => ({
            text: reference.text.trim(),
            url: reference.url.trim(),
        }))
        .filter((reference) => reference.text && reference.url),
    content: Array.isArray(data.content) ? data.content : [],
});

const createContentBlock = (type) => {
    const block = { type };

    if (type === 'heading' || type === 'subheading' || type === 'paragraph') block.text = '';
    if (type === 'image') {
        block.src = '';
        block.alt = '';
        block.caption = '';
    }
    if (type === 'list') block.items = [''];
    if (type === 'link') {
        block.text = '';
        block.url = '';
    }

    return block;
};

const ContentBuilder = ({
    blocks,
    onAddBlock,
    onRemoveBlock,
    onUpdateBlock,
    onUpdateListItem,
    onAddListItem,
    label = 'Content Blocks',
}) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{label}</h3>
            <div className="flex flex-wrap gap-2 text-[10px]">
                <button type="button" onClick={() => onAddBlock('heading')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Heading</button>
                <button type="button" onClick={() => onAddBlock('subheading')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Subheading</button>
                <button type="button" onClick={() => onAddBlock('paragraph')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Paragraph</button>
                <button type="button" onClick={() => onAddBlock('image')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Image</button>
                <button type="button" onClick={() => onAddBlock('list')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">List</button>
                <button type="button" onClick={() => onAddBlock('link')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Link</button>
                <button type="button" onClick={() => onAddBlock('ad')} className="px-2 py-1 bg-dark-border rounded hover:bg-dark-accent transition-colors">Ad Slot</button>
            </div>
        </div>

        <div className="space-y-6">
            {blocks.map((block, index) => (
                <div key={index} className="bg-dark-bg/50 p-6 rounded-xl border border-dark-border relative group">
                    <button
                        type="button"
                        onClick={() => onRemoveBlock(index)}
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
                            onChange={(e) => onUpdateBlock(index, 'text', e.target.value)}
                            className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg text-white focus:outline-none focus:border-dark-accent"
                            placeholder={`Enter ${block.type} text...`}
                        />
                    )}

                    {block.type === 'image' && (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={block.src}
                                onChange={(e) => onUpdateBlock(index, 'src', e.target.value)}
                                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                                placeholder="Image URL"
                            />
                            <input
                                type="text"
                                value={block.alt}
                                onChange={(e) => onUpdateBlock(index, 'alt', e.target.value)}
                                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                                placeholder="Alt text"
                            />
                            <input
                                type="text"
                                value={block.caption}
                                onChange={(e) => onUpdateBlock(index, 'caption', e.target.value)}
                                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-[10px] text-white"
                                placeholder="Caption"
                            />
                        </div>
                    )}

                    {block.type === 'list' && (
                        <div className="space-y-2">
                            {block.items.map((item, itemIndex) => (
                                <input
                                    key={itemIndex}
                                    type="text"
                                    value={item}
                                    onChange={(e) => onUpdateListItem(index, itemIndex, e.target.value)}
                                    className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                                    placeholder={`List item ${itemIndex + 1}`}
                                />
                            ))}
                            <button type="button" onClick={() => onAddListItem(index)} className="text-dark-accent text-[10px] font-bold">+ Add Item</button>
                        </div>
                    )}

                    {block.type === 'link' && (
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={block.text}
                                onChange={(e) => onUpdateBlock(index, 'text', e.target.value)}
                                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                                placeholder="Link title"
                            />
                            <input
                                type="text"
                                value={block.url}
                                onChange={(e) => onUpdateBlock(index, 'url', e.target.value)}
                                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                                placeholder="https://..."
                            />
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
);

const ReferencesBuilder = ({ references, onAddReference, onUpdateReference, onRemoveReference }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">References</h3>
            <button
                type="button"
                onClick={onAddReference}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dark-border text-dark-accent text-sm font-semibold hover:border-dark-accent transition-colors"
            >
                <Plus size={14} />
                Add Reference
            </button>
        </div>

        <div className="space-y-3">
            {references.map((reference, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 bg-dark-bg/50 p-4 rounded-xl border border-dark-border">
                    <input
                        type="text"
                        value={reference.text}
                        onChange={(e) => onUpdateReference(index, 'text', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                        placeholder="Reference title"
                    />
                    <input
                        type="text"
                        value={reference.url}
                        onChange={(e) => onUpdateReference(index, 'url', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white"
                        placeholder="https://..."
                    />
                    <button
                        type="button"
                        onClick={() => onRemoveReference(index)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-300 text-sm font-semibold hover:bg-red-500/20 transition-colors"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const PostBasics = ({ data, onChange, titleLabel = 'Post Title' }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <label className="block">
                <span className="text-dark-muted text-sm font-medium mb-1 block">{titleLabel}</span>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                    placeholder="Enter Title"
                    required
                />
            </label>
            <label className="block">
                <span className="text-dark-muted text-sm font-medium mb-1 block">Description</span>
                <textarea
                    value={data.description}
                    onChange={(e) => onChange('description', e.target.value)}
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
                    value={data.image}
                    onChange={(e) => onChange('image', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                    placeholder="https://..."
                    required
                />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-dark-muted text-sm font-medium mb-1 block">Topic(s)</span>
                    <input
                        type="text"
                        value={data.topic}
                        onChange={(e) => onChange('topic', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                        placeholder="Tech, Science..."
                    />
                </label>
                <label className="block">
                    <span className="text-dark-muted text-sm font-medium mb-1 block">Subtopics</span>
                    <input
                        type="text"
                        value={data.subtopics}
                        onChange={(e) => onChange('subtopics', e.target.value)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                        placeholder="Learning, AI, History..."
                    />
                </label>
            </div>
        </div>
    </div>
);

const PostForm = ({ post, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        topic: '',
        subtopics: '',
        type: 'post',
        content: [],
        references: [{ ...emptyReference }],
        subPosts: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (post) {
            setFormData({
                ...post,
                topic: stringifyTagField(post.topic),
                subtopics: stringifyTagField(post.subtopics),
                content: post.content || [],
                references: normalizeReferenceInputs(post.references),
                subPosts: Array.isArray(post.subPosts) ? post.subPosts.map(formatSubPostForForm) : [],
            });
            return;
        }

        setFormData({
            title: '',
            description: '',
            image: '',
            topic: '',
            subtopics: '',
            type: 'post',
            content: [],
            references: [{ ...emptyReference }],
            subPosts: [],
        });
    }, [post]);

    const updateFormField = (field, value) => {
        setFormData((current) => ({ ...current, [field]: value }));
    };

    const updateSubPostField = (subPostIndex, field, value) => {
        setFormData((current) => ({
            ...current,
            subPosts: current.subPosts.map((subPost, index) => (
                index === subPostIndex ? { ...subPost, [field]: value } : subPost
            )),
        }));
    };

    const addSubPost = () => {
        setFormData((current) => ({
            ...current,
            subPosts: [...current.subPosts, { ...emptySubPost, references: [{ ...emptyReference }] }],
        }));
    };

    const removeSubPost = (subPostIndex) => {
        setFormData((current) => ({
            ...current,
            subPosts: current.subPosts.filter((_, index) => index !== subPostIndex),
        }));
    };

    const updateContentState = (updater, subPostIndex = null) => {
        setFormData((current) => {
            if (subPostIndex === null) {
                return { ...current, content: updater(current.content) };
            }

            return {
                ...current,
                subPosts: current.subPosts.map((subPost, index) => (
                    index === subPostIndex ? { ...subPost, content: updater(subPost.content || []) } : subPost
                )),
            };
        });
    };

    const updateReferencesState = (updater, subPostIndex = null) => {
        setFormData((current) => {
            if (subPostIndex === null) {
                return { ...current, references: updater(current.references) };
            }

            return {
                ...current,
                subPosts: current.subPosts.map((subPost, index) => (
                    index === subPostIndex ? { ...subPost, references: updater(subPost.references || [{ ...emptyReference }]) } : subPost
                )),
            };
        });
    };

    const addContentBlock = (type, subPostIndex = null) => {
        updateContentState((content) => [...content, createContentBlock(type)], subPostIndex);
    };

    const removeContentBlock = (blockIndex, subPostIndex = null) => {
        updateContentState((content) => content.filter((_, index) => index !== blockIndex), subPostIndex);
    };

    const updateContentBlock = (blockIndex, field, value, subPostIndex = null) => {
        updateContentState((content) => content.map((block, index) => (
            index === blockIndex ? { ...block, [field]: value } : block
        )), subPostIndex);
    };

    const updateListItem = (blockIndex, itemIndex, value, subPostIndex = null) => {
        updateContentState((content) => content.map((block, index) => {
            if (index !== blockIndex) return block;

            return {
                ...block,
                items: block.items.map((item, currentIndex) => (
                    currentIndex === itemIndex ? value : item
                )),
            };
        }), subPostIndex);
    };

    const addListItem = (blockIndex, subPostIndex = null) => {
        updateContentState((content) => content.map((block, index) => (
            index === blockIndex ? { ...block, items: [...block.items, ''] } : block
        )), subPostIndex);
    };

    const addReference = (subPostIndex = null) => {
        updateReferencesState((references) => [...references, { ...emptyReference }], subPostIndex);
    };

    const updateReference = (referenceIndex, field, value, subPostIndex = null) => {
        updateReferencesState((references) => references.map((reference, index) => (
            index === referenceIndex ? { ...reference, [field]: value } : reference
        )), subPostIndex);
    };

    const removeReference = (referenceIndex, subPostIndex = null) => {
        updateReferencesState((references) => {
            const nextReferences = references.filter((_, index) => index !== referenceIndex);
            return nextReferences.length ? nextReferences : [{ ...emptyReference }];
        }, subPostIndex);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const body = {
            ...buildPostPayload(formData),
            subPosts: formData.type === 'collection'
                ? formData.subPosts.map((subPost) => ({
                    ...buildPostPayload(subPost),
                    type: 'post',
                }))
                : [],
        };

        try {
            if (post) {
                await updatePost(post.id, body);
                onSuccess('Post updated successfully.');
            } else {
                await createPost(body);
                onSuccess('Post published successfully.');
            }
        } catch (err) {
            alert(err.message || 'Network error');
        } finally {
            setLoading(false);
        }
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
                    <PostBasics data={formData} onChange={updateFormField} />

                    <div className="grid grid-cols-1 gap-4">
                        <label className="block">
                            <span className="text-dark-muted text-sm font-medium mb-1 block">Type</span>
                            <select
                                value={formData.type}
                                onChange={(e) => updateFormField('type', e.target.value)}
                                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:outline-none focus:border-dark-accent"
                            >
                                <option value="post">Standard Post</option>
                                <option value="collection">Collection Hub</option>
                            </select>
                        </label>
                    </div>

                    <ContentBuilder
                        blocks={formData.content}
                        onAddBlock={(type) => addContentBlock(type)}
                        onRemoveBlock={(index) => removeContentBlock(index)}
                        onUpdateBlock={(index, field, value) => updateContentBlock(index, field, value)}
                        onUpdateListItem={(blockIndex, itemIndex, value) => updateListItem(blockIndex, itemIndex, value)}
                        onAddListItem={(blockIndex) => addListItem(blockIndex)}
                    />

                    <ReferencesBuilder
                        references={formData.references}
                        onAddReference={() => addReference()}
                        onUpdateReference={(index, field, value) => updateReference(index, field, value)}
                        onRemoveReference={(index) => removeReference(index)}
                    />

                    {formData.type === 'collection' && (
                        <div className="space-y-5 rounded-2xl border border-dark-border bg-dark-bg/30 p-5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Collection Posts</h3>
                                    <p className="text-sm text-dark-muted">Add the posts that should appear inside this collection.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addSubPost}
                                    className="inline-flex items-center gap-2 rounded-xl bg-dark-accent px-4 py-2 font-bold text-white transition-all hover:shadow-neon"
                                >
                                    <Plus size={16} />
                                    Add Collection Post
                                </button>
                            </div>

                            {formData.subPosts.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-dark-border p-5 text-sm text-dark-muted">
                                    No posts inside this collection yet. Use "Add Collection Post" to create one.
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {formData.subPosts.map((subPost, subPostIndex) => (
                                        <div key={subPost.id || subPostIndex} className="rounded-2xl border border-dark-border bg-dark-surface/70 p-5 space-y-6">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <h4 className="text-lg font-bold text-white">
                                                        {subPost.title || `Collection Post ${subPostIndex + 1}`}
                                                    </h4>
                                                    <p className="text-xs text-dark-muted">This item will be shown inside the collection page.</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubPost(subPostIndex)}
                                                    className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <PostBasics
                                                data={subPost}
                                                onChange={(field, value) => updateSubPostField(subPostIndex, field, value)}
                                                titleLabel="Collection Post Title"
                                            />

                                            <ContentBuilder
                                                blocks={subPost.content}
                                                onAddBlock={(type) => addContentBlock(type, subPostIndex)}
                                                onRemoveBlock={(index) => removeContentBlock(index, subPostIndex)}
                                                onUpdateBlock={(index, field, value) => updateContentBlock(index, field, value, subPostIndex)}
                                                onUpdateListItem={(blockIndex, itemIndex, value) => updateListItem(blockIndex, itemIndex, value, subPostIndex)}
                                                onAddListItem={(blockIndex) => addListItem(blockIndex, subPostIndex)}
                                                label="Collection Post Content"
                                            />

                                            <ReferencesBuilder
                                                references={subPost.references}
                                                onAddReference={() => addReference(subPostIndex)}
                                                onUpdateReference={(index, field, value) => updateReference(index, field, value, subPostIndex)}
                                                onRemoveReference={(index) => removeReference(index, subPostIndex)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </form>

                <div className="p-6 border-t border-dark-border bg-dark-surface">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 bg-dark-accent text-white font-bold rounded-xl hover:shadow-neon transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Publishing...' : post ? 'Update Post' : 'Save and Publish Post'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
