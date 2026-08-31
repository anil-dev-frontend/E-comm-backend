const express = require("express");
const router = express.Router();
const { createBrand, getBrand, deleteBrand, updateBrand } = require("../controllers/brand-controllers");

// Routes Binding
router.post("/", createBrand);
router.get("/", getBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
