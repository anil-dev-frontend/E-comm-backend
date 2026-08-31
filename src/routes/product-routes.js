const express = require("express");
const router = express.Router();
const { createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/product-controllers");

// Routes Binding
router.post("/", createProduct);
router.get("/", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
