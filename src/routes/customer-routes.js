const express = require("express");
const router = express.Router();

// Product Controller se customer functions ko import kiya aapke pasandida style me
const { getNewProducts, getFeaturedProducts } = require("../controllers/product-controllers");
const { getCustomerCategories} = require("../controllers/category-controllers");
const { getCustomerBrands} = require("../controllers/brand.controller");

// Clean Customer Home APIs Links
router.get("/new-product", getNewProducts);
router.get("/featured-products", getFeaturedProducts);
router.get("/categories", getCustomerCategories);
router.get("/brands", getCustomerBrands);

module.exports = router;
