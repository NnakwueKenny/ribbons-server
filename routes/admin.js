const express = require('express');
const router = express.Router();

const usersController = require('../controllers/adminController');
const upload = require('../middleware/upload');

// const accessToken = usersController.accessToken;

router.post(`/current-admin`, usersController.index);

module.exports = router;