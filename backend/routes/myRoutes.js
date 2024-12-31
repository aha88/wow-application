const express = require('express');
const userRoutes = require('./users'); 
const employeeRoute = require('./employee'); 
const companyRoute = require('./company'); 
const dashboardRoute = require('./dashboard'); 
 
const router = express.Router();

// '/api' path
router.use('/api', userRoutes);
router.use('/api', employeeRoute);
router.use('/api', companyRoute);
router.use('/api', dashboardRoute);
 

module.exports = router;

