const Admin = require('../models/AdminModel');
const AdminChat = require('../models/AdminChatModel');
const AllChats = require('../models/AllChatsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const register = async (req, res) => {
    console.log('Request Body:', req.body);
    const {name, phone, email, username, password, confirmPassword, loc} = req.body;
    // console.log('SPLITTED PASSWORD', password.split(' ').join('').length);
    console.log(name, phone, email, username, password, confirmPassword, loc);

    Admin.findOne({
        $and: [
            {loc: loc},
            {$or: [{ username: username }, {email: email}]}
        ]
    }, (err, userExists) => {
        if (err) {
            return res.status(422).send(err);
        }
        if (userExists) {
            console.log('User already exists.')
            return res.status(422).json('User already exists.');
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    res.json(err)
                } else {
                    if (password !== '' || confirmPassword !== '') {
                        if (confirmPassword === password) {
                            const user = new Admin({
                                name: name,
                                phone: phone,
                                email: email,
                                username: username,
                                password: hashedPassword,
                                loc: loc,
                            });
                
                            user.save()
                            .then((user) => res.json( {
                                    message: `User account for ${user.name} has been created successfully!`
                                })
                            )
                            .catch(err => {
                                res.json('Oops, an error has occured!')
                            })
                        } else {
                            res.json('Passwords do not match!')
                        }
                    } else {
                        res.json('Please, provide password!')
                    }
                }
            });
        }
    });
}

// Login Admin
const login = async (req, res, next) => {
    let {username, password} = req.body;
    Admin.findOne({$or: [{username:username}, {email:username}]})
    .then(admin => {
            bcrypt.compare(password, admin.password, (err, result) => {
                if (err) {
                    res.json(
                        {error: err}
                    )
                }
                if (result) {
                    let accessToken = jwt.sign(
                        {username: admin.username},
                        process.env.accessToken,
                        {expiresIn: '7d'}
                    );
                    res.json(
                        {
                            message: 'Login Successful',
                            accessToken: accessToken,
                            location: admin.loc
                        }
                    )
                    admin.accessToken = accessToken;
                    console.log(admin);
                    admin.save()
                } else {
                    res.status(422).json(
                        {
                            err: 'Password does not match!'
                        }
                    )
                }
            })
        }
    )
    .catch (err => {console.log(err); res.json(
        {err: 'No user matched the provided details!'}
    )})
}

// Show all user's data
// let currentUser = '';
const index = (req, res, next) => {
    const {accessToken} = req.body;
    console.log(accessToken);

    Admin.findOne({accessToken})
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        res.json({
            notFound: 'An error just occured'
        });
    });
};

// All about admin chats
const adminchat = async (req, res) => {
    const { sender, receiver, msg, dept, loc, status} = req.body;
    // console.log( sender, receiver, msg, reason, loc, status, sessionEnded );
    
    let adminChat = new AdminChat({
        sender: sender,
        receiver: receiver,
        msg: msg,
        dept: dept,
        loc: loc,
        status: status
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
                    status: 'sent',
                }
            ],
            lastUpdatedAt: Date.now(),
            location: loc
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
                if (user.location !== loc) [
                    user.location = loc
                ]
                user.lastUpdatedAt = Date.now();
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
    register,
    login,
    index,
    adminchat
}