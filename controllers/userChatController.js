const UserChat = require('../models/UserChatModel');
const AllChats = require('../models/AllChatsModel');
const Admin = require('../models/AdminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userchat = async (req, res) => {
    // console.log('Request Body:', req.body);
    const { sender, receiver, msg, dept, loc, status } = req.body;
    let receivingAdmin;
    const adminsInLoc = await Admin.find( { loc: loc.toLowerCase() });

    if (adminsInLoc.length > 0) {
        const randomAgentInLocation = adminsInLoc[Math.floor(Math.random() * adminsInLoc.length)];      // Random Admin from above
        receivingAdmin = randomAgentInLocation.username;
    } else {
        receivingAdmin = '+2348137926904';
    }

    let userChat = new UserChat({
        sender: sender,
        receiver: receivingAdmin,
        msg: msg,
        dept: dept,
        loc: loc.toLowerCase(),
        status: status
    });

    userChat.save()
    .then(userChatRes => {
        // Update AllChats
        let allChats = new AllChats({
            user: sender,
            message: [
                {
                    dept: dept,
                    content: msg,
                    status: 'sent',
                    source: status == '0'? online: 'offline'
                }
            ],
            lastUpdatedAt: Date.now(),
            location: loc
        });

        AllChats.findOne({ user: sender })
        .then(user => {
            if (user) {
                const messages = user.message;
                messages.push({
                    dept: dept,
                    content: msg,
                    status: 'sent',
                    source: status == '0'? online: 'offline'
                })
                user.message = messages;
                if (user.location !== loc) {
                    user.location = loc
                }
                user.lastUpdatedAt = Date.now();
                user.save()
                .then(response => {
                    console.log(response, 'line 42');
                    res.json({
                        user,
                    });
                })
                console.log(user, 'line 28');
            } else {
                allChats.save()
                .then(allChatRes => {
                    console.log(allChatRes, 'line 42');
                    res.json( allChatRes );
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