const express = require('express');
const router = express.Router();

const supportController = require('../controllers/supportController');
const upload = require('../middleware/upload');

// const accessToken = usersController.accessToken;

router.post(`/get-all-support`, supportController.getAllSupport);

module.exports = router;