
const AllChats = require('../models/AllChatsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const allchats = async (req, res) => {
    const { receiver } = req.body;

    AllChats.findOne({ user: receiver })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(422).json('An error just occured');
    })
}
module.exports = {
    allchats
}