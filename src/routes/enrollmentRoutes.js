// routes/enrollmentRoutes.js

const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', enrollmentController.getHomepage);
router.post('/payment', enrollmentController.makePayment);
router.post('/submit-form', enrollmentController.submitForm);
router.get('/users', enrollmentController.getUsers);
router.post('/update-batch', enrollmentController.updateBatch);

module.exports = router;
