const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    cat: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    medium: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    loc: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    sent_to: {
        type: String,
        required: true
    },
    id: {
        type: String
    }
    // avatars: {
    //     type: String
    // },
}, {timestamps: true});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;