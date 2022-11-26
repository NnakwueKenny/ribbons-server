const express = require('express');
const router = express.Router();

const agentController = require('../controllers/agentController');

router.post('/register', agentController.register);

module.exports = router;