const Support = require('../models/SupportModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Send Complaint
const sendsupport = async (req, res) => {
    // console.log('Request Body:', req.body);
    // Generate random ID for the complaint
    const {v4: uuid} = require('uuid');
    const {cat, name, desc, medium, status, loc, phone, id} = req.body;
    console.log(cat, name, desc, medium, status, loc, phone, id);

    if (id) {
        Support.findOne({id: id})
        .then(support => {
            console.log(support)
            if (support) {
                support.cat = cat;
                support.name = name;
                support.desc = desc;
                support.medium = medium;
                support.status = status;
                support.loc = loc;
                support.phone = phone;
                support.id = id;
                
                support.save()
                .then(support => {
                    res.json(`Complaint saved successfully!`)
                })
                .catch(err => res.json({error: 'All fields are required!'}));
            } else {
                res.json({error: `No support with the following: ${id} found!`})
            }
        })
    } else {
        const support = new support({
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
}

const deletesupport = async (req, res) => {
    console.log('Hello');
    const { supportID } = req.body;

    Support.findOne({id: supportID})
    .then(complaint => {
        if (complaint) {
            // Delete support
            Support.findOneAndRemove({id: supportID})
            .then(() => {
                res.json({
                    message: `support ${supportID} deleted successfully!`
                });
            })
            .catch(err => {
                res.json({
                    message: 'An error just occured, while deleting the support!'
                });
            });
        } else {
            return res.json({
                message: 'support not found'
            });
        }
    })
}

const getAllsupports = (req, res) => {
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
    sendsupport,
    deletesupport,
    getAllsupports
}