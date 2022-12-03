const Draft = require('../models/DraftModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Send Complaint
const sendDraft = async (req, res) => {
    // console.log('Request Body:', req.body);
    // Generate random ID for the complaint
    const {v4: uuid} = require('uuid');
    const {cat, name, desc, medium, status, loc, phone, id} = req.body;
    console.log(cat, name, desc, medium, status, loc, phone, id);

    if (id) {
        Draft.findOne({id: id})
        .then(draft => {
            draft.cat = cat;
            draft.name = name;
            draft.desc = desc;
            draft.medium = medium;
            draft.status = status;
            draft.loc = loc;
            draft.phone = phone;
            draft.id = id;
            
            draft.save()
            .then(draft => {
                res.json(`Complaint saved successfully!`)
            })
            .catch(err => res.json({error: 'All fields are required!'}));
        })
    } else {
        const draft = new Draft({
            cat: cat,
            name: name,
            desc: desc,
            medium: medium,
            status: status,
            loc: loc,
            phone: phone,
            id: uuid()
        })

        draft.save()
        .then(draft => {
            res.json(`Complaint saved successfully!`)
        })
        .catch(err => res.json({error: 'All fields are required!'}));
    }
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

const getAllDrafts = (req, res) => {
    const { loc, username} = req.body;

    Draft.find({ loc: loc })
    .then(draft => {
        res.json(draft)
    })
    .catch(err => res.json({
        err
    }))
}

module.exports = {
    sendDraft,
    deleteDraft,
    getAllDrafts
}