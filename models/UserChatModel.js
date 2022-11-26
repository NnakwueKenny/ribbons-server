const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userChatSchema = new Schema(
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
            type: String
        },
        loc: {
            type: String,
            required: true
        },
        sessionEnded: {
            type: Boolean
        },
        status: {
            type: Number
        }
    },
    {timestamps: true}
);

const UserChat = mongoose.model('UserChat', userChatSchema);
module.exports = UserChat;