const express = require('express');
const router = express.Router();

const draftController = require('../controllers/draftController');

router.post('/delete-draft', draftController.deleteDraft);

module.exports = router;