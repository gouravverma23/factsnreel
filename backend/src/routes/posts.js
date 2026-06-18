const express = require('express');

const { Post } = require('../models/Post');
const { verifyAdmin } = require('../middleware/adminAuth');
const { normalizePostPayload } = require('../utils/normalize');

const router = express.Router();

router.get('/', async (_req, res) => {
    const posts = await Post.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
    res.json(posts);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findOne({ id: String(req.params.id) }).lean();

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(post);
});

router.post('/', verifyAdmin, async (req, res) => {
    const lastPost = await Post.findOne().sort({ sortOrder: -1 }).lean();
    const payload = normalizePostPayload(req.body);

    const post = await Post.create({
        ...payload,
        sortOrder: (lastPost?.sortOrder ?? -1) + 1,
    });

    res.status(201).json(post);
});

router.put('/:id', verifyAdmin, async (req, res) => {
    const existingPost = await Post.findOne({ id: String(req.params.id) });

    if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const payload = normalizePostPayload(req.body, existingPost.toObject());

    existingPost.set({
        ...payload,
        sortOrder: existingPost.sortOrder,
    });

    await existingPost.save();
    res.json(existingPost);
});

router.delete('/:id', verifyAdmin, async (req, res) => {
    const deletedPost = await Post.findOneAndDelete({ id: String(req.params.id) });

    if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
});

module.exports = router;
