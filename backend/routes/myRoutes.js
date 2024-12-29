const express = require('express');
const userRoutes = require('./users'); 
const employeeRoute = require('./employee'); 

const router = express.Router();

// '/api' path
router.use('/api', userRoutes);
router.use('/api', employeeRoute);

module.exports = router;

