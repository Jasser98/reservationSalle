const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');

//regiter 
router.get('/register', userController.registerPage);

router.post('/register', userController.register);

//login
router.get('/login', userController.loginPage);

router.post('/login', userController.login);

module.exports = router;
