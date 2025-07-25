const Order = require('../models/OrderModel');
const Product = require('../models/Product');
const Cart = require('../models/CartModel');

module.exports.createOrder = async function (req, res) {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ status: false, message: 'Cart is empty' });
    }

    let totalAmount = 0;
    cart.products.forEach(prod => {
      totalAmount += prod.price * prod.quantity;
    });

    // Prepare order products array
    const orderProducts = cart.products.map(p => ({
      productId: p.productId,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
    }));

    // Create order
    const order = new Order({
      userId,
      products: orderProducts,
      totalAmount,
      status: 'Completed',
    });

    await order.save();

    // Clear user's cart
    cart.products = [];
    await cart.save();

    return res.status(201).json({
      status: true,
      message: 'Order placed successfully',
      data: order,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

// Get user's orders
module.exports.getOrders = async function (req, res) {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
