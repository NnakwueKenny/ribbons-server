const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allChatsSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    lastUpdatedAt: {
        type: String
    }
}, {timestamps: true});

const AllChat = mongoose.model('AllChat', allChatsSchema);
module.exports = AllChat;