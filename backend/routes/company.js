const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define Customer routes
router.get('/companies', authenticateToken,verifyUser,  companyController.getAllCompanies); 
router.get('/companies/company/:id', authenticateToken,verifyUser,  companyController.getCompanyDetailsID); 
 
module.exports = router;
