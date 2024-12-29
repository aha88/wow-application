const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define user routes

router.post('/login',  userController.postLogin);       
router.get('/users', authenticateToken, verifyUser, userController.getAllUsers);       
 
module.exports = router;
