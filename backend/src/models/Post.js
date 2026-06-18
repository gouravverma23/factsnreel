const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        default: '',
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: [String],
        default: [],
    },
    subtopics: {
        type: [String],
        default: [],
    },
    type: {
        type: String,
        default: 'post',
        trim: true,
    },
    content: {
        type: [Schema.Types.Mixed],
        default: [],
    },
    references: {
        type: [Schema.Types.Mixed],
        default: [],
    },
    subPosts: {
        type: [Schema.Types.Mixed],
        default: [],
    },
    sortOrder: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = {
    Post,
};
