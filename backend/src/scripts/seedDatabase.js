const fs = require('fs/promises');
const path = require('path');

const { Post } = require('../models/Post');
const { Fact } = require('../models/Fact');
const { normalizePostPayload, normalizeFactPayload } = require('../utils/normalize');

const backendRoot = path.resolve(__dirname, '../..');

const readJsonFile = async (fileName) => {
    const filePath = path.join(backendRoot, 'data', fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
};

const seedDatabaseIfEmpty = async () => {
    if (process.env.AUTO_SEED_DB === 'false') {
        return;
    }

    const [postCount, factCount] = await Promise.all([
        Post.countDocuments(),
        Fact.countDocuments(),
    ]);

    const tasks = [];

    if (postCount === 0) {
        tasks.push((async () => {
            const rawPosts = await readJsonFile('posts.json');
            const posts = rawPosts.map((post, index) => ({
                ...normalizePostPayload(post),
                sortOrder: index,
            }));

            if (posts.length > 0) {
                await Post.insertMany(posts, { ordered: true });
                console.log(`Seeded ${posts.length} posts from backend/data/posts.json`);
            }
        })());
    }

    if (factCount === 0) {
        tasks.push((async () => {
            const rawFacts = await readJsonFile('facts.json');
            const facts = rawFacts.map((fact, index) => ({
                ...normalizeFactPayload(fact),
                sortOrder: index,
            }));

            if (facts.length > 0) {
                await Fact.insertMany(facts, { ordered: true });
                console.log(`Seeded ${facts.length} facts from backend/data/facts.json`);
            }
        })());
    }

    await Promise.all(tasks);
};

module.exports = {
    seedDatabaseIfEmpty,
};
