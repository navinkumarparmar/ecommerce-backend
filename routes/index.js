const express = require('express');
const apiroutes = express.Router();

const auth = require('./authRoutes');
const product = require('./productRoutes');
const cart = require('./cartRoutes');
const order = require('./orderRoutes');

apiroutes.use('/auth',auth);
apiroutes.use('/product',product);
apiroutes.use('/cart',cart);
apiroutes.use('/order',order);

module.exports = apiroutes;