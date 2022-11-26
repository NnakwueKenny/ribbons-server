const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminChatSchema = new Schema(
    {
        sender: {
            type: String,
            required: true
        },
        receiver: {
            type: String,
            required: true
        },
        msg: {
            type: String,
            required: true
        },
        dept: {
            type: String,
            required: true
        },
        loc: {
            type: String,
            required: true
        },
        sessionEnded: {
            type: Boolean,
            required: true
        },
        status: {
            type: Number
        }
    },
    {timestamps: true}
);

const adminChat = mongoose.model('adminChat', adminChatSchema);
module.exports = adminChat;