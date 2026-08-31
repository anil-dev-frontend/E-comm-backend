const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ status: "N", message: "Category name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ status: "N", message: "Category already exists" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({
      status: "Y",
      message: "Category created successfully",
      data: newCategory
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    if (!categories || categories.length === 0) {
      return res.status(200).json({
        status: "N",
        message: "No categories found",
        data: []
      });
    }

    res.status(200).json({
      status: "Y",
      message: "Categories fetched successfully",
      data: categories
    });

  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name } = req.body; 
    if (!name) {
      return res.status(400).json({ status: "N", message: "Category name is required to update" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(id,{ name },{ new: true, runValidators: true });
    if (!updatedCategory) {
      return res.status(404).json({ status: "N", message: "Category not found" });
    }
    res.status(200).json({
      status: "Y",
      message: "Category updated successfully",
      data: updatedCategory
    });

  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};



exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ status: "N", message: "Category not found" });
    }
    res.status(200).json({
      status: "Y",
      message: "Category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};



//  exports.createCategory = async (req, res) => {

//   let model = req.body;
//   let category = new Category({
//     name:model.name
//   })
//   category.save();
//   res.send(category.toObject())
//  }