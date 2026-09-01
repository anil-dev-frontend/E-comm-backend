const express = require("express");
const router = express.Router();

// Product Controller se customer functions ko import kiya aapke pasandida style me
const { getNewProducts, getFeaturedProducts } = require("../controllers/product-controllers");

// Clean Customer Home APIs Links
router.get("/new-product", getNewProducts);
router.get("/featured-products", getFeaturedProducts);

module.exports = router;
