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
            {loc: loc.toLowerCase()},
            {$or: [{ username: username }, {email: email.toLowerCase()}]}
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
                                email: email.toLowerCase(),
                                username: username,
                                password: hashedPassword,
                                loc: loc.toLowerCase(),
                            });
                
                            user.save()
                            .then((user) => res.json( {
                                    message: `User account for ${user.name} has been created successfully!`
                                })
                            )
                            .catch(err => {
                                res.json({error: 'Oops, an error has occured!'})
                            })
                        } else {
                            res.json(
                                {error: 'Passwords do not match!'}
                            )
                        }
                    } else {
                        res.json(
                            {error: 'Please, provide password!'}
                        )
                    }
                }
            });
        }
    });
}

// Login Admin
const login = async (req, res, next) => {
    let {username, password} = req.body;
    Admin.findOne({$or: [{username:username.toLowerCase()}, {email:username.toLowerCase()}]})
    .then(admin => {
            bcrypt.compare(password, admin.password, (err, result) => {
                if (err) {
                    res.json(
                        {error: 'An error just ocurred!'}
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
                            error: 'Password does not match!'
                        }
                    )
                }
            })
        }
    )
    .catch (err => {console.log(err);
        res.json(
            {error: 'No Admin matched the provided details!'}
        )
    })
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
    
    let adminChat = new AdminChat({
        sender: sender,
        receiver: receiver,
        msg: msg,
        dept: dept,
        loc: loc.toLowerCase(),
        status: status == '1'? 'offline': 'online'
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
                    status: 'received',
                    source: status == '1'? 'offline': 'online'
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
                    status: 'received',
                    source: status == '1'? 'offline': 'online'
                })
                user.message = messages;
                if (user.location !== loc) {
                    user.location = loc
                }
                user.lastUpdatedAt = Date.now();

                // find user's last chat
                const userLastChat = messages.filter(message => message.status === 'sent').pop();
                console.log(userLastChat);

                if (userLastChat?.source === 'offline' ) {
                    // Send SMS to user
                    console.log('Sending SMS to user');
                    fetch(`https://fancy.com/api/sms/sendsms?username=farex&password=faruqcomputers&sender=Ribbons&recipient=%22${'+2348137926904'}%22&message=${msg}`)
                }

                user.save()
                .then(response => {
                    res.json(response);
                })
            } else {
                allChats.save()
                .then(allChatRes => {
                    res.json(allChatRes);
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