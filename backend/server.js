require('dotenv/config');

const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./src/config/db');
const { seedDatabaseIfEmpty } = require('./src/scripts/seedDatabase');
const adminRouter = require('./src/routes/admin');
const postsRouter = require('./src/routes/posts');
const factsRouter = require('./src/routes/facts');

const app = express();
const port = Number(process.env.PORT || 5000);
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({
    origin: clientOrigin,
    credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        service: 'FactsnReel API',
        database: 'mongodb',
    });
});

app.use('/api/admin', adminRouter);
app.use('/api/posts', postsRouter);
app.use('/api/facts', factsRouter);

app.get('/', (_req, res) => {
    res.send('FactsnReel MongoDB API is running...');
});

app.use((err, _req, res, next) => {
    void next;
    console.error(err);
    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal server error',
    });
});

const startServer = async () => {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
