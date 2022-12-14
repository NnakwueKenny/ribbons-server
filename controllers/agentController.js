const Agent = require('../models/AgentModel');
const AdminChat = require('../models/AdminChatModel');
const AllChats = require('../models/AllChatsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const register = async (req, res) => {
    const {name, phone, email, username, password, confirmPassword, dept, loc} = req.body;
    // console.log('SPLITTED PASSWORD', password.split(' ').join('').length);
    console.log(name, phone, email, username, password, confirmPassword, dept, loc);

    Agent.findOne({$or: [{ username: username }, {email: email} ]},
        (err, userExists) => {
        if (err) {
            return res.status(422).json({error: 'An error just occured'});
        }
        if (userExists) {
            console.log('Agent already exists.')
            return res.status(422).json({
                error: 'Agent already exists.'
            });
        } else {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    res.json({
                        error: 'An error just occurred'
                    })
                } else {
                    if (password !== '' || confirmPassword !== '') {
                        if (confirmPassword === password) {
                            const agent = new Agent({
                                name: name,
                                phone: phone,
                                email: email.toLowerCase(),
                                username: username,
                                password: hashedPassword,
                                dept: dept,
                                loc: loc.toLowerCase(),
                            });
                
                            agent.save()
                            .then((currentAgent) => res.json( {
                                    message: `User account for ${currentAgent.name} has been created successfully!`
                                })
                            )
                            .catch(err => {
                                res.json ({error: 'Oops, an error has occured!'})
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

// Login Agent
const login = async (req, res, next) => {
    let { username, password } = req.body;
    console.log(username, password);
    // await Agent.findOne({$or: [{username:username}, {email:username}]})
    // .then(result => {
    //     console.log('The result:',result)
    // })
    
    await Agent.findOne({$or: [{username: username.toLowerCase()}, {email:username.toLowerCase()}]})
    .then(agent => {
            bcrypt.compare(password, agent.password, (err, result) => {
                if (err) {
                    res.json(
                        {error: 'An error just ocurred!'}
                    )
                }
                if (result) {
                    let accessToken = jwt.sign(
                        {username: agent.username},
                        process.env.accessToken,
                        {expiresIn: '7d'}
                    );
                    res.json(
                        {
                            message: 'Login Successful',
                            accessToken: accessToken,
                            location: agent.loc,
                            username: agent.username,
                            phone: agent.phone,
                            name: agent.name
                        }
                    )
                    agent.accessToken = accessToken;
                    console.log(agent);
                    agent.save()
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
            {error: 'No Agent matched the provided details!'}
        )
    })
}

// Show all agent's data
// let currentAgent = '';
const index = (req, res, next) => {
    const {accessToken} = req.body;
    console.log(accessToken);

    Agent.findOne({accessToken})
    .then(response => {
        res.json({
            response
        });
    })
    .catch(err => {
        res.json({
            message: 'An error just occured'
        });
    });
};

// All about agent chats
const agentChat = async (req, res) => {
    const { sender, receiver, msg, dept, loc, status} = req.body;
    // console.log( sender, receiver, msg, reason, loc, status, sessionEnded );
    
    let agentchat = new AdminChat({
        sender: sender,
        receiver: receiver,
        msg: msg,
        dept: dept,
        loc: loc,
        status: status
    });

    agentchat.save()
    .then(agentChatRes => {
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
                        agentChatRes,
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
    agentChat
}