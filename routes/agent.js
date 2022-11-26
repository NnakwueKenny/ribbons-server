const express = require('express');
const router = express.Router();

const agentController = require('../controllers/agentController');
const upload = require('../middleware/upload');

// const accessToken = usersController.accessToken;

router.get(`/currentUser`, agentController.index);

module.exports = router;