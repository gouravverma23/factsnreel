const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    if (!mongoUri) {
        throw new Error('MONGODB_URI is missing. Add it to backend/.env before starting the server.');
    }

    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoUri, {
        dbName: process.env.MONGODB_DB_NAME || undefined,
    });

    console.log('Connected to MongoDB');
};

module.exports = {
    connectToDatabase,
};
