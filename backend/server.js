import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read data
const getData = (filename) => {
    const filePath = path.join(__dirname, 'data', `${filename}.json`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

// Helper to save data
const saveData = (filename, data) => {
    const filePath = path.join(__dirname, 'data', `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Simple Password Protection Middleware
const adminAuth = (req, res, next) => {
    const password = req.headers['x-admin-password'];
    // For now, using a hardcoded password. In a real app, use .env
    const ADMIN_PASSWORD = 'factsnreel-admin-2024';
    if (password === ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized: Incorrect Admin Password' });
    }
};

// API Endpoints
app.get('/api/facts', (req, res) => {
    try {
        const facts = getData('facts');
        res.json(facts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch facts' });
    }
});

app.post('/api/facts', adminAuth, (req, res) => {
    try {
        const facts = getData('facts');
        const newFact = { id: Date.now(), ...req.body };
        facts.push(newFact);
        saveData('facts', facts);
        res.status(201).json(newFact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save fact' });
    }
});

app.put('/api/facts/:id', adminAuth, (req, res) => {
    try {
        const facts = getData('facts');
        const index = facts.findIndex(f => String(f.id) === String(req.params.id));
        if (index === -1) return res.status(404).json({ error: 'Fact not found' });

        facts[index] = { ...facts[index], ...req.body };
        saveData('facts', facts);
        res.json(facts[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update fact' });
    }
});

app.delete('/api/facts/:id', adminAuth, (req, res) => {
    try {
        const facts = getData('facts');
        const filteredFacts = facts.filter(f => String(f.id) !== String(req.params.id));
        saveData('facts', filteredFacts);
        res.json({ message: 'Fact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete fact' });
    }
});

app.get('/api/posts', (req, res) => {
    try {
        const posts = getData('posts');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.post('/api/posts', adminAuth, (req, res) => {
    try {
        const posts = getData('posts');
        const newPost = { id: Date.now(), ...req.body };
        posts.push(newPost);
        saveData('posts', posts);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save post' });
    }
});

app.put('/api/posts/:id', adminAuth, (req, res) => {
    try {
        const posts = getData('posts');
        const index = posts.findIndex(p => String(p.id) === String(req.params.id));
        if (index === -1) return res.status(404).json({ error: 'Post not found' });

        posts[index] = { ...posts[index], ...req.body };
        saveData('posts', posts);
        res.json(posts[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

app.delete('/api/posts/:id', adminAuth, (req, res) => {
    try {
        const posts = getData('posts');
        const filteredPosts = posts.filter(p => String(p.id) !== String(req.params.id));
        saveData('posts', filteredPosts);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Hello endpoint
app.get('/', (req, res) => {
    res.send('FactsnReel API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
