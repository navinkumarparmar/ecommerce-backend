const Cart = require('../models/CartModel');
const Product = require('../models/Product');


module.exports.addCart = async function (req, res) {
  try {
    const { productId, quantity = 1 } = req.body;
   const userId = req.user ? req.user.id : null;
    const guestId = req.headers['guest-id'] || null;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const filter = userId ? { userId } : { guestId };

    let cart = await Cart.findOne(filter);

    if (!cart) {
      cart = new Cart({
        userId: userId || null,
        guestId: guestId || null,
        products: [],
      });
    }

    const existingProductIndex = cart.products.findIndex(p =>
      p.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // Product already in cart, update quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.products.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    await cart.save();
    return res.status(200).json({message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};



module.exports.getCart = async function(req, res) {
  try {
    const userId = req.user ? req.user.id : null;  
    const guestId = req.headers['guest-id'];       

    if (userId) {
      const cart = await Cart.findOne({ userId });
      if (!cart || cart.products.length === 0) {
        return res.status(200).json({ message: 'Cart is empty', products: [] });
      }
      return res.status(200).json({ products: cart.products });
    } else if (guestId) {
      const cart = await Cart.findOne({ guestId });
      if (!cart || cart.products.length === 0) {
        return res.status(200).json({ message: 'Cart is empty', products: [] });
      }
      return res.status(200).json({ products: cart.products });
    } else {
      return res.status(400).json({ message: 'User not identified' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.removeFromCart = async function(req, res) {
  try {
    const productId = req.params.productId;
    const userId = req.user ? req.user.id : null;
    const guestId = req.headers['guest-id'] || null;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const filter = userId ? { userId } : { guestId };

    let cart = await Cart.findOne(filter).select('-createdAt -updatedAt -__v');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product to be removed
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    await cart.save();

    return res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports.updateCart = async function(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user ? req.user.id : null;
    const guestId = req.headers['guest-id'] || null;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const filter = userId ? { userId } : { guestId };

    let cart = await Cart.findOne(filter);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    if (quantity === 0) {
      cart.products.splice(productIndex, 1);
    } else {
      cart.products[productIndex].quantity = quantity;
    }

    await cart.save();

    return res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
