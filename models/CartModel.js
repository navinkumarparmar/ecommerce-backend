const mongoose = require('mongoose');

const cartModel = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
    guestId: { type: String },
   products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

const CartModel = mongoose.model('Cart', cartModel);
module.exports = CartModel;
