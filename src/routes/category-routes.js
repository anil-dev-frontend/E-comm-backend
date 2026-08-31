const express = require("express");
const router = express.Router();
const {createCategory,getCategory,deleteCategory,updateCategory} = require("../controllers/category-controllers");


router.post("/", createCategory);

router.get("/", getCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

module.exports = router;