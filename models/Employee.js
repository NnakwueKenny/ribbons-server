const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    age: {
        type: String
    },
    avatar: {
        type: String
    },
    // avatars: {
    //     type: String
    // },
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;