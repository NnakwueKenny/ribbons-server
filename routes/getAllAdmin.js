const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/get-all-admin', adminController.getAllAdmin);

module.exports = router;