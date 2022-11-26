const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.post('/chat', adminController.adminchat);

module.exports = router;