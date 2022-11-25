const express = require('express');
const router = express.Router();

const adminRegisterController = require('../controllers/adminRegisterController');

router.post('/register', adminRegisterController.register);

module.exports = router;