const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, shortDescription, description, price, discount, categoryId,brandId, image,isFeatured, isNewProduct } = req.body;
    if (!name || !price || !categoryId || !brandId) {
      return res.status(400).json({ status: "N", message: "Name, Price, and Category ID are required" });
    }

    const newProduct = new Product({name,shortDescription,description,price,discount,categoryId,brandId,image,isFeatured, isNewProduct});

    await newProduct.save();

    res.status(201).json({
      status: "Y",
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

// 2. Get All Products (GET)
const getProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .populate("brandId", "name")
      .sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      return res.status(200).json({
        status: "N",
        message: "No products found",
        data: []
      });
    }

    res.status(200).json({
      status: "Y",
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

// 3. Update Product (PUT)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id,updateData,{ new: true, runValidators: true });

    if (!updatedProduct) {
      return res.status(404).json({ status: "N", message: "Product not found" });
    }

    res.status(200).json({
      status: "Y",
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

// 4. Delete Product (DELETE)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ status: "N", message: "Product not found" });
    }

    res.status(200).json({
      status: "Y",
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};


// ---- 5. GET NEW PRODUCTS FOR CUSTOMER HOME (GET) ----
const getNewProducts = async (req, res) => {
  try {
    const newProducts = await Product.find({ isNewProduct: true })
      .populate("categoryId", "name")
      .populate("brandId", "name")
      .sort({ createdAt: -1 }) 
      .limit(8); 

    res.status(200).json({
      status: "Y",
      message: "New products fetched successfully",
      data: newProducts
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

// ---- 6. GET FEATURED PRODUCTS FOR CUSTOMER HOME (GET) ----
const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true })
      .populate("categoryId", "name")
      .populate("brandId", "name")
      .sort({ createdAt: -1 })
      .limit(8); 

    res.status(200).json({
      status: "Y",
      message: "Featured products fetched successfully",
      data: featuredProducts
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};


module.exports = {createProduct,getProduct,updateProduct,deleteProduct,getNewProducts,getFeaturedProducts};
