const AllChats = require('../models/AllChatsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const allchats = async (req, res) => {
    const { phone, sessionEnded } = req.body;
    // console.log( sender, receiver, msg, reason, loc, status, sessionEnded );
    console.log(req.body)
    console.log(phone, sessionEnded)
    AllChats.findOne({ user: phone })
    .then(user => {
        if (user) {
            if (sessionEnded === true) {
                user.message = []
                user.save()
                .then(response => {
                    res.json({
                        user,
                        response
                    });
                })
            } else {
                res.json({
                    user
                })
            }
        } else {
            res.json({
                noUser: "User chats not found"
            })
            console.log('User not found!');
        }
    });
}
module.exports = {
    allchats
}