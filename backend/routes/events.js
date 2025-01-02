const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
 router.post('/events/upload-pic/:id', authenticateToken,verifyUser, eventsController.uploadFileIMG); 
 router.post('/events/upload-cert/:id', authenticateToken,verifyUser, eventsController.uploadFilePDF); 
 

module.exports = router;
