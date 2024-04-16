const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

//regiter 
router.get('/register', userController.registerPage);

router.post('/register', userController.register);

//login
router.get('/login', userController.loginPage);

router.post('/login', userController.login);

//logout 
router.get('/logout',authenticate, userController.logout);

module.exports = router;
