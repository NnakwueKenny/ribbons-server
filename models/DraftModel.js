const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const draftSchema = new Schema({
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
    id: {
        type: String
    }
    // avatars: {
    //     type: String
    // },
}, {timestamps: true});

const Draft = mongoose.model('Draft', draftSchema);
module.exports = Draft;