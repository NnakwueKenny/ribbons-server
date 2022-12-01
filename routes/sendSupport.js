const express = require('express');
const router = express.Router();

const supportController = require('../controllers/supportController');
const upload = require('../middleware/upload');

// const accessToken = usersController.accessToken;

router.post(`/send-support`, supportController.sendSupport);

module.exports = router;