const express = require('express');
const apiroutes = express.Router();

const authController = require('../controllers/authController')
apiroutes.post('/register',authController.register);
apiroutes.post('/login',authController.login);
module.exports = apiroutes;