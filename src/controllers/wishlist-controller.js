const Wishlist = require('../models/wishlist');


const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;
    // Validation
    if (!productId) {
      return res.status(400).json({
        status: "N",
        message: "Product ID is required"
      });
    }
    // Check product already exists in wishlist
    const existingWishlist = await Wishlist.findOne({
      userId,
      productId
    });
    if (existingWishlist) {
      return res.status(400).json({
        status: "N",
        message: "Product already exists in wishlist"
      });
    }
    // Create wishlist
    const newWishlist = new Wishlist({
      userId,
      productId
    });
    // Save wishlist
    await newWishlist.save();

    return res.status(201).json({
      status: "Y",
      message: "Product added to wishlist",
      data: newWishlist
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "N",
      message: "Server Error",
      error: error.message
    });
  }
};


// 2. Get logged-in user's wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({ userId })
      .populate("productId");

    const products = wishlist.map(item => item.productId);

    return res.status(200).json({
      status: "Y",
      message: "Wishlist fetched successfully",
      data: products
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: "N",
      message: "Server Error",
      error: error.message
    });
  }
};


// 3. Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const wishlist = await Wishlist.findOneAndDelete({
      userId,
      productId
    });
    if (!wishlist) {
      return res.status(404).json({
        status: "N",
        message: "Product not found in wishlist"
      });
    }
    return res.status(200).json({
      status: "Y",
      message: "Product removed from wishlist"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "N",
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {addToWishlist,getWishlist,removeFromWishlist};