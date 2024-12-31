const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define Customer routes
router.get('/dashboardCount', authenticateToken,verifyUser,  dashboardController.counterContainer); 
router.get('/dashboard-company-count', authenticateToken,verifyUser,  dashboardController.counterConditionGeneral); 
router.get('/dashboard-company-count/:id', authenticateToken,verifyUser,  dashboardController.counterConditionByCompany); 
 
module.exports = router;
