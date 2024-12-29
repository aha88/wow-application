const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
router.get('/employees', authenticateToken,verifyUser, employeeController.getAllEmployee); 
router.get('/employees-leave-history/:id/:company', authenticateToken,verifyUser, userAccessPass, employeeController.idEmployeeLeaveHistory); 
router.post('/employee/add', authenticateToken,verifyUser, employeeController.employeeAdd); 

module.exports = router;
