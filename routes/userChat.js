const express = require('express');
const router = express.Router();

const userChatContoller = require('../controllers/userChatController');

router.post('/chat', userChatContoller.userchat);

module.exports = router;