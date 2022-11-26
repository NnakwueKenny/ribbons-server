const express = require('express');
const router = express.Router();

const complaintController = require('../controllers/complaintController');

router.post('/update-complaint', complaintController.updateComplaint);

module.exports = router;