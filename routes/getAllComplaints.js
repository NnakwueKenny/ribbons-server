const express = require('express');
const router = express.Router();

const complaintController = require('../controllers/complaintController');

router.post('/get-all-complaints', complaintController.getAllComplaints);

module.exports = router;