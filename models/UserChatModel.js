const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userChatSchema = new Schema(
    {
        sender: {
            type: String,
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
        status: {
            type: String
        }
    },
    {timestamps: true}
);

const UserChat = mongoose.model('UserChat', userChatSchema);
module.exports = UserChat;