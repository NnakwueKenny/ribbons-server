const Support = require('../models/SupportModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Send Complaint
const sendSupport = async (req, res) => {
    // console.log('Request Body:', req.body);
    // Generate random ID for the complaint
    const {v4: uuid} = require('uuid');
    const {cat, name, desc, medium, status, loc, phone} = req.body;
    console.log(cat, name, desc, medium, status, loc, phone);
    const support = new Support({
        cat: cat,
        name: name,
        desc: desc,
        medium: medium,
        status: status,
        loc: loc,
        phone: phone,
        id: uuid()
    })

    support.save()
    .then(support => {
        res.json(`Complaint saved successfully!`)
    })
    .catch(err => res.json({error: 'All fields are required!'}));
}

const deleteSupport = async (req, res) => {
    console.log('Hello');
    const { supportID } = req.body;

    Support.findOne({id: supportID})
    .then(complaint => {
        if (complaint) {
            // Delete Support
            Support.findOneAndRemove({id: supportID})
            .then(() => {
                res.json({
                    message: `Complaint ${supportID} removed successfully!`
                });
            })
            .catch(err => {
                res.json({
                    message: 'An error just occured!'
                });
            });
        } else {
            return res.json({
                message: 'Complaint not found'
            });
        }
    })
}

const getAllSupport = (req, res) => {
    const { loc, username} = req.body;

    Support.find({ loc: loc })
    .then(support => {
        res.json(support)
    })
    .catch(err => res.json({
        err
    }))
}

module.exports = {
    sendSupport,
    deleteSupport,
    getAllSupport
}