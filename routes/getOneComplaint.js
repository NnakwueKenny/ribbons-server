const express = require('express');
const router = express.Router();

const complaintController = require('../controllers/complaintController');

router.post('/get-one-complaint', complaintController.getOneComplaint);

module.exports = router;