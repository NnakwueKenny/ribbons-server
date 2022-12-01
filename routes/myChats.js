const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

router.post('/my-chats', chatController.myChats);

module.exports = router;