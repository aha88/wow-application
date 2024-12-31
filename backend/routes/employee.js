const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
router.get('/employees', authenticateToken,verifyUser, employeeController.getAllEmployee); 
router.get('/employee/company/:id', authenticateToken,verifyUser, employeeController.allEmployeeByCompany); 
// router.post('/employee/add', authenticateToken,verifyUser, employeeController.employeeAdd); 
// router.get('/employee/:id', authenticateToken,verifyUser, userAccessPass, employeeController.idEmployee); 
// router.post('/employee_update/:id', authenticateToken,verifyUser,userAccessPass, employeeController.idEmployeeUpdate); 
// router.post('/employee-details-update/:id', authenticateToken,verifyUser, userAccessPass, employeeController.idEmployeeDetailsUpdate); 

module.exports = router;
