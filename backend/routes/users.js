const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define user routes

router.post('/login',  userController.postLogin);       
router.get('/users', authenticateToken, verifyUser, userController.getAllUsers);       
router.get('/user/employeesCompany', authenticateToken,verifyUser, userController.userEmployees);       
router.get('/user/:id', authenticateToken, verifyUser,userAccessPass, userController.getUserId); 
router.post('/user/add', authenticateToken, verifyUser, userController.addUserAccess);       
router.get('/user/delete/:id', authenticateToken, verifyUser,userAccessPass, userController.deleteUserAccess);       
router.post('/user/update/:id', authenticateToken, verifyUser,userAccessPass, userController.updateUserAccess);       
router.post('/user/updatePassword/:id', authenticateToken,verifyUser, userAccessPass, userController.updatePasswordUserAccess);       

module.exports = router;
