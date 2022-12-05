const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    cat: {
        type: String,
        required: true
    },
    severity: {
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
    sent_by: {
        type: String,
        required: true
    },
    sent_to: {
        type: String,
        required: true
    },
    admin_phone: {
        type: String,
        required: true
    },
    agent_phone: {
        type: String,
        required: true
    },
    comment: {
        type: String,
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