const mongoose = require('mongoose');

const { Schema } = mongoose;

const factSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    image: {
        type: String,
        default: '',
        trim: true,
    },
    fact: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    list: {
        type: [String],
        default: [],
    },
    listName: {
        type: String,
        default: '',
        trim: true,
    },
    reference: {
        type: String,
        default: '',
        trim: true,
    },
    credit: {
        type: String,
        default: '',
        trim: true,
    },
    readMoreLink: {
        type: String,
        default: '',
        trim: true,
    },
    buttonText: {
        type: String,
        default: '',
        trim: true,
    },
    sortOrder: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Fact = mongoose.models.Fact || mongoose.model('Fact', factSchema);

module.exports = {
    Fact,
};
