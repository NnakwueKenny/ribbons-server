const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    loc: {
        type: String,
        required: true
    },
    accessToken: {
        type: String
    },
    // avatars: {
    //     type: String
    // },
}, {timestamps: true});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;