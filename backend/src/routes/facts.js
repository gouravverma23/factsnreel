const express = require('express');

const { Fact } = require('../models/Fact');
const { verifyAdmin } = require('../middleware/adminAuth');
const { normalizeFactPayload } = require('../utils/normalize');

const router = express.Router();

router.get('/', async (_req, res) => {
    const facts = await Fact.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
    res.json(facts);
});

router.get('/:id', async (req, res) => {
    const fact = await Fact.findOne({ id: String(req.params.id) }).lean();

    if (!fact) {
        return res.status(404).json({ error: 'Fact not found' });
    }

    return res.json(fact);
});

router.post('/', verifyAdmin, async (req, res) => {
    const lastFact = await Fact.findOne().sort({ sortOrder: -1 }).lean();
    const payload = normalizeFactPayload(req.body);

    const fact = await Fact.create({
        ...payload,
        sortOrder: (lastFact?.sortOrder ?? -1) + 1,
    });

    res.status(201).json(fact);
});

router.put('/:id', verifyAdmin, async (req, res) => {
    const existingFact = await Fact.findOne({ id: String(req.params.id) });

    if (!existingFact) {
        return res.status(404).json({ error: 'Fact not found' });
    }

    const payload = normalizeFactPayload(req.body, existingFact.toObject());

    existingFact.set({
        ...payload,
        sortOrder: existingFact.sortOrder,
    });

    await existingFact.save();
    res.json(existingFact);
});

router.delete('/:id', verifyAdmin, async (req, res) => {
    const deletedFact = await Fact.findOneAndDelete({ id: String(req.params.id) });

    if (!deletedFact) {
        return res.status(404).json({ error: 'Fact not found' });
    }

    res.json({ message: 'Fact deleted successfully' });
});

module.exports = router;
