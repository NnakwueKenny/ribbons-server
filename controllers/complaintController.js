const Complaint = require('../models/ComplaintModel');
const Agent = require('../models/AgentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Send Complaint
const sendComplaint = async (req, res) => {
    // console.log('Request Body:', req.body);
    // Generate random ID for the complaint
    const {v4: uuid} = require('uuid');
    const {cat, severity, name, desc, medium, status, loc, phone, sent_by} = req.body;
    console.log(cat, severity, name, desc, medium, status, loc, phone, sent_by);

    const agentsInLoc = await Agent.find( { $and: [ { dept: cat }, { loc: loc } ]});         //Agents in location under specified department

    if (agentsInLoc.length > 0) {
        const randomAgentInLocation = agentsInLoc[Math.floor(Math.random() * agentsInLoc.length)];      // Random Agent from above
        const sent_to = randomAgentInLocation.username;
        const complaintID = uuid();
        const complaint = new Complaint({
            cat: cat,
            severity: severity,
            name: name,
            desc: desc,
            medium: medium,
            status: false,
            loc: loc,
            phone: phone,
            sent_by: sent_by,
            sent_to: sent_to,
            id: complaintID
        })
    
        complaint.save()
        .then(complaint => {
            res.json(`Complaint created successfully!`)
        })
        .catch(() => res.json({error: 'All fields are required!'}));
    } else {
        res.status(404).json({error: `No available ${cat} assistance centers in your location. We shall notify you when and if we do...`})
    }
}

const updateComplaint = async (req, res) => {
    console.log('Hello');
    const { updateStatus, complaintID } = req.body;

    Complaint.findOne({id: complaintID})
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
            if (updateStatus === 'resolve') {
                complaint.status = true;
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
            res.json({
                complaint: `No complaint found!`
            })
        }
    })
    .catch(err => res.json({
        err
    }))
}

const getAllComplaints = (req, res) => {
    const { loc, username} = req.body;

    Complaint.find({$and: [ { loc: loc }, { $or: [ { sent_by: username }, { sent_to: username }]} ]})
    .then(complaints => {
        res.json(complaints)
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