const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const upload = require('../middleware/upload');

const accessToken = usersController.accessToken;

router.get(`/currentUser`, usersController.index);

module.exports = router;