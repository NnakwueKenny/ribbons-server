const Complaint = require('../models/Complaint');
const Agent = require('../models/AgentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Send Complaint
const sendComplaint = async (req, res) => {
    // console.log('Request Body:', req.body);
    // Generate random ID for the complaint
    const {v4: uuid} = require('uuid');
    const {cat, name, desc, medium, status, loc, phone, sent_to} = req.body;
    console.log(cat, name, desc, medium, status, loc, phone, sent_to);

    

    const complaint = new Complaint({
        cat: cat,
        name: name,
        desc: desc,
        medium: medium,
        status: false,
        loc: loc,
        phone: phone,
        sent_to: sent_to,
        id: uuid()
    })

    complaint.save()
    .then(complaints => {
        res.json({
            complaints
        })
    })
    .catch(err => res.json({err}));
}

const updateComplaint = async (req, res) => {
    console.log('Hello');
    const { updateStatus, complaintID } = req.body;

    Complaint.find({id: complaintID})
    .then(complaint => {
        if (complaint) {

            // Delete Complaint
            if (updateStatus === 'delete') {
                Complaint.findOneAndRemove({id: complaintID})
                .then(() => {
                    res.json({
                        message: `Complaint ${complaintID} removed successfully!`
                    });
                })
                .catch(err => {
                    res.json({
                        message: 'An error just occured!'
                    });
                });
            }

            // Resolve Complaint
            if (updateStatus === 'resolved') {
                complaint.status = updateStatus;
                complaint.save()
                .then(() => {
                    res.json({
                        message: `Complaint ${complaintID} resolved successfully!`
                    });
                })
                .catch(err => {
                    res.json({
                        err: 'An error just occured!'
                    });
                });
            }
        } else {
            return res.json({
                message: 'Complaint not found'
            });
        }
    })
}

const getOneComplaint = (req, res) => {
    const { complaintID } = req.body;

    Complaint.findOne({id: complaintID})
    .then(complaint => {
        if (complaint) {
            res.json({
                complaint
            })
        } else {
            
        }
    })
    .catch(err => res.json({
        err
    }))
}

const getAllComplaints = (req, res) => {
    const { location } = req.body;

    Complaint.find({loc: location})
    .then(complaints => {
        res.json({
            complaints
        })
    })
    .catch(err => res.json({
        err
    }))
}

module.exports = {
    sendComplaint,
    updateComplaint,
    getAllComplaints,
    getOneComplaint
}