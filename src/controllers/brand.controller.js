
const Brand = require("../models/brands");

// 1. Create Brand (POST)
exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ status: "N", message: "Brand name is required" });
    }

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ status: "N", message: "Brand already exists" });
    }

    const newBrand = new Brand({ name });
    await newBrand.save();

    res.status(201).json({
      status: "Y",
      message: "Brand created successfully",
      data: newBrand.toObject()
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

// 2. Get All Brands (GET)
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });

    if (!brands || brands.length === 0) {
      return res.status(200).json({
        status: "N",
        message: "No brands found",
        data: []
      });
    }

    res.status(200).json({
      status: "Y",
      message: "Brands fetched successfully",
      data: brands.map(x => x.toObject())
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

// 3. Update Brand (PUT)
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ status: "N", message: "Brand name is required to update" });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id,{ name },{ new: true, runValidators: true });

    if (!updatedBrand) {
      return res.status(404).json({ status: "N", message: "Brand not found" });
    }

    res.status(200).json({
      status: "Y",
      message: "Brand updated successfully",
      data: updatedBrand.toObject()
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};

// 4. Delete Brand (DELETE)
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ status: "N", message: "Brand not found" });
    }

    res.status(200).json({
      status: "Y",
      message: "Brand deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ status: "N", message: "Server Error", error: error.message });
  }
};









































// const Brand = require("../models/brand");

// async function getBrands() {
//     let brands = await Brand.find();
//     return brands.map(x => x.toObject()); // spelling thik ki hai
// }

// async function getBrand(id) {
//     let brand = await Brand.findById(id);
//     return brand ? brand.toObject() : null;
// }

// async function addBrand(model) {
//     let brand = new Brand({
//         name: model.name
//     });
//     await brand.save();
//     return brand.toObject();
// }

// async function updateBrand(id, model) {
//     // { new: true } lagane se updated data return hoga
//     let updated = await Brand.findByIdAndUpdate(id, model, { new: true });
//     return updated ? updated.toObject() : null;
// }

// // Naya Delete Function
// async function deleteBrand(id) {
//     let deletedBrand = await Brand.findByIdAndDelete(id);
//     return deletedBrand ? deletedBrand.toObject() : null;
// }

// // Saare functions ko export karein taaki Router file me use ho sakein
// module.exports = {
//     getBrands,
//     getBrand,
//     addBrand,
//     updateBrand,
//     deleteBrand
// };
