const Cart = require('../models/cart');
const Product = require('../models/product');

// ==========================
// ADD TO CART
// ==========================
const addToCart = async (req, res) => {
  try {
    // JWT se user id
    const userId = req.user.id;

    const { productId, quantity = 1 } = req.body;

    // Product ID check
    if (!productId) {
      return res.status(400).json({
        status: 'N',
        message: 'Product ID is required'
      });
    }

    // Quantity check
    if (Number(quantity) < 1) {
      return res.status(400).json({
        status: 'N',
        message: 'Quantity must be at least 1'
      });
    }

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: 'N',
        message: 'Product not found'
      });
    }

    // Check product already exists in user's cart
    const existingCart = await Cart.findOne({
      userId,
      productId
    });

    // If already exists -> quantity increase
    if (existingCart) {
      existingCart.quantity += Number(quantity);

      await existingCart.save();

      return res.status(200).json({
        status: 'Y',
        message: 'Product quantity updated in cart',
        data: existingCart
      });
    }

    // Create new cart item
    const cart = await Cart.create({
      userId,
      productId,
      quantity: Number(quantity)
    });

    return res.status(201).json({
      status: 'Y',
      message: 'Product added to cart successfully',
      data: cart
    });

  } catch (error) {
    console.error('ADD CART ERROR:', error);

    return res.status(500).json({
      status: 'N',
      message: 'Internal server error',
      error: error.message
    });
  }
};


// ==========================
// GET CART
// ==========================
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.find({
      userId
    }).populate('productId');

    return res.status(200).json({
      status: 'Y',
      message: 'Cart fetched successfully',
      data: cart
    });

  } catch (error) {
    console.error('GET CART ERROR:', error);

    return res.status(500).json({
      status: 'N',
      message: 'Internal server error',
      error: error.message
    });
  }
};


// ==========================
// UPDATE CART QUANTITY
// ==========================
const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.params;
    const { quantity } = req.body;

    // Quantity check
    if (!quantity || Number(quantity) < 1) {
      return res.status(400).json({
        status: 'N',
        message: 'Quantity must be at least 1'
      });
    }

    // Find cart item for current user
    const cart = await Cart.findOne({
      userId,
      productId
    });

    if (!cart) {
      return res.status(404).json({
        status: 'N',
        message: 'Product not found in cart'
      });
    }

    // Update quantity
    cart.quantity = Number(quantity);

    await cart.save();

    return res.status(200).json({
      status: 'Y',
      message: 'Cart quantity updated successfully',
      data: cart
    });

  } catch (error) {
    console.error('UPDATE CART ERROR:', error);

    return res.status(500).json({
      status: 'N',
      message: 'Internal server error',
      error: error.message
    });
  }
};


// ==========================
// REMOVE FROM CART
// ==========================
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.params;

    // Find and delete cart item
    const cart = await Cart.findOneAndDelete({
      userId,
      productId
    });

    if (!cart) {
      return res.status(404).json({
        status: 'N',
        message: 'Product not found in cart'
      });
    }

    return res.status(200).json({
      status: 'Y',
      message: 'Product removed from cart successfully',
      data: cart
    });

  } catch (error) {
    console.error('REMOVE CART ERROR:', error);

    return res.status(500).json({
      status: 'N',
      message: 'Internal server error',
      error: error.message
    });
  }
};

const clearCart = async (req, res) => {
  try {

    await Cart.deleteMany({
      userId: req.user.id
    });

    return res.status(200).json({
      status: 'Y',
      message: 'Cart cleared successfully',
      data: []
    });

  } catch (error) {

    console.error('Clear cart error:', error);

    return res.status(500).json({
      status: 'N',
      message: 'Failed to clear cart'
    });

  }
};


// ==========================
// EXPORT
// ==========================
module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
};