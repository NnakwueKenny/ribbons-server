const UserChat = require('../models/UserChatModel');
const AllChats = require('../models/AllChatsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userchat = async (req, res) => {
    // console.log('Request Body:', req.body);
    const { sender, receiver, msg, reason, loc, status, sessionEnded } = req.body;
    // console.log( sender, receiver, msg, reason, loc, status, sessionEnded );

    
    let userChat = new UserChat({
        sender: sender,
        receiver: receiver,
        msg: msg,
        dept: reason,
        loc: loc,
        status: status,
        sessionEnded: sessionEnded
    });

    userChat.save()
    .then(userChatRes => {
        // Update AllChats
        let allChats = new AllChats({
            user: sender,
            message: [
                {
                    reason: reason,
                    content: msg,
                    status: 'sent'
                }
            ]
        });

        AllChats.findOne({ user: sender })
        .then(user => {
            if (user) {
                const messages = user.message;
                messages.push({
                    reason: reason,
                    content: msg,
                    status: 'sent'
                })
                user.message = messages;
                user.save()
                .then(response => {
                    console.log(response, 'line 42');
                    res.json({
                        response,
                    });
                })
                console.log(user, 'line 28');
            } else {
                allChats.save()
                .then(allChatRes => {
                    console.log(allChatRes, 'line 42');
                    res.json({
                        userChatRes,
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
    userchat
}