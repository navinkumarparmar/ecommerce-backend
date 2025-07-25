const express = require('express');
const apiroutes = express.Router();

const cartController = require('../controllers/cartController')
const {verifyToken,verifyTokenOptional} = require('../middlewares/tokenVerify')
apiroutes.post('/add',verifyTokenOptional,cartController.addCart);
apiroutes.get('/getCart',verifyTokenOptional,cartController.getCart);
apiroutes.delete('/remove/:productId',verifyTokenOptional,cartController.removeFromCart)
apiroutes.put('/update',verifyTokenOptional,cartController.updateCart)

module.exports = apiroutes;