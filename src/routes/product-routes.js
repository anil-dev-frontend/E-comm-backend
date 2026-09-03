const express = require("express");
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct,getProductList } = require("../controllers/product-controllers");

// Routes Binding
router.post("/", createProduct);
router.get("/", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/list", getProductList);

module.exports = router;
