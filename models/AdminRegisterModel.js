const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminRegisterSchema = new Schema({
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
    accessToken: {
        type: String
    },
    // avatars: {
    //     type: String
    // },
}, {timestamps: true});

const AdminRegister = mongoose.model('AdminRegister', adminRegisterSchema);
module.exports = AdminRegister;