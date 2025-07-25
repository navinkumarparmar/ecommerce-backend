const express = require('express');
const apiroutes = express.Router();

const orderController = require('../controllers/orderController')
const {verifyToken} = require('../middlewares/tokenVerify')
apiroutes.post('/createOrder',verifyToken,orderController.createOrder);
apiroutes.get('/getOrders',verifyToken,orderController.getOrders)

module.exports = apiroutes;