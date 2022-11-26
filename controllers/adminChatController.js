const AdminChat = require('../models/AdminChatModel');
const AllChats = require('../models/AllChatsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminchat = async (req, res) => {
    const { sender, receiver, msg, dept, loc, status, sessionEnded } = req.body;
    // console.log( sender, receiver, msg, reason, loc, status, sessionEnded );

    
    let adminChat = new AdminChat({
        sender: sender,
        receiver: receiver,
        msg: msg,
        dept: dept,
        loc: loc,
        status: status,
        sessionEnded: sessionEnded
    });

    adminChat.save()
    .then(adminChatRes => {
        // Update AllChats
        let allChats = new AllChats({
            user: receiver,
            message: [
                {
                    dept: dept,
                    content: msg,
                    status: 'sent'
                }
            ]
        });

        AllChats.findOne({ user: receiver })
        .then(user => {
            if (user) {
                const messages = user.message;
                messages.push({
                    dept: dept,
                    content: msg,
                    status: 'received'
                })
                user.message = messages;
                user.save()
                .then(response => {
                    res.json({
                        response,
                    });
                })
            } else {
                allChats.save()
                .then(allChatRes => {
                    res.json({
                        adminChatRes,
                        allChatRes
                    });
                })
                console.log('User not found!');
            }
        });
    })
    .catch(err => {
        res.json({
            message: err
        });
    });
}
module.exports = {
    adminchat
}