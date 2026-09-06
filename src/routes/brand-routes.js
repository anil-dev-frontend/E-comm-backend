const express = require("express");
const router = express.Router();
const { createBrand, getBrands, deleteBrand, updateBrand } = require("../controllers/brand.controller");

// Routes Binding
router.post("/", createBrand);
router.get("/", getBrands);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = router;
