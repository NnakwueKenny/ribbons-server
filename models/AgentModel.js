const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
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
    // avatars: {
    //     type: String
    // },
}, {timestamps: true});

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;