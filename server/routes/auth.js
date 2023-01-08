
const express = require('express');

const router = express.Router();

//const userController = require('../controllers/userController');
const authController= require('../controllers/auth');
module.exports = router;
router.post('/register',authController.register)
