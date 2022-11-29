const express = require('express');
const router = express.Router();

const draftController = require('../controllers/draftController');

router.post('/send-draft', draftController.sendDraft);

module.exports = router;