const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, employeeController.index);
router.post('/showEmployee', employeeController.showEmployee);
// router.post('/storeEmployee', upload.single('avatar'), employeeController.storeEmployee);
router.post('/storeEmployee', upload.array('avatar[]'), employeeController.storeEmployee);
router.post('/updateEmployee', employeeController.updateEmployee);
router.post('/deleteEmployee', employeeController.deleteEmployee);

module.exports = router;