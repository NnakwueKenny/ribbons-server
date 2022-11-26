const express = require('express');
const router = express.Router();

const adminChatController = require('../controllers/adminChatController');

router.post('/chat', adminChatController.adminchat);

module.exports = router;