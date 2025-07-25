const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: false 
    },
    price: {
        type: Number,
        required: true  
    },
    imageUrl: {
        type: String,
        required: false
    }
}, {
    timestamps: true 
});

const ProductModel = mongoose.model('Product', productModel);
module.exports = ProductModel;
