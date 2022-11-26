const express = require('express');
const router = express.Router();

const complaintController = require('../controllers/complaintController');

router.post('/send-complaint', complaintController.sendComplaint);

module.exports = router;