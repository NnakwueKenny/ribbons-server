
const AllChats = require('../models/AllChatsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const chat = async (req, res) => {
    const { receiver } = req.body;

    AllChats.findOne({ user: receiver })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(422).json('An error just occured');
    })
}

const myChats = async (req, res) => {
    const { loc } = req.body;

    AllChats.find({ location: loc })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(422).json('An error just occured');
    })
}

module.exports = {
    chat,
    myChats
}