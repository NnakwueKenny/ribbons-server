const Draft = require('../models/DraftModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Send Complaint
const sendDraft = async (req, res) => {
    // console.log('Request Body:', req.body);
    // Generate random ID for the complaint
    const {v4: uuid} = require('uuid');
    const {cat, name, desc, medium, status, loc, phone} = req.body;
    console.log(cat, name, desc, medium, status, loc, phone);

    const draft = new Draft({
        cat: cat,
        name: name,
        desc: desc,
        medium: medium,
        status: false,
        loc: loc,
        phone: phone,
        id: uuid()
    })

    draft.save()
    .then(draft => {
        res.json({
            draft
        })
    })
    .catch(err => res.json({err}));
}

const deleteDraft = async (req, res) => {
    console.log('Hello');
    const { draftID } = req.body;

    Draft.findOne({id: draftID})
    .then(complaint => {
        if (complaint) {
            // Delete Draft
            Draft.findOneAndRemove({id: draftID})
            .then(() => {
                res.json({
                    message: `Complaint ${draftID} removed successfully!`
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

module.exports = {
    sendDraft,
    deleteDraft,
}