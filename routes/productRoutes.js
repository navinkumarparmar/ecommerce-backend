const express = require('express');
const apiroutes = express.Router();

const productController = require('../controllers/productController')
apiroutes.get('/listAll',productController.listAll);

module.exports = apiroutes;