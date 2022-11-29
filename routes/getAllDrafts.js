const express = require('express');
const router = express.Router();

const draftController = require('../controllers/draftController');

router.post('/get-drafts', draftController.getAllDrafts);

module.exports = router;