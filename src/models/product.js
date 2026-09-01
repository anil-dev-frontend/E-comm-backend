const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: { 
    type: Number,
    required: true,
    default: 0
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true 
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand', 
    required: true 
  },

  image: [
    {
      type: String
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false 
  },
  isNewProduct: { 
    type: Boolean,
    default: false 
  }
}, {
  timestamps: true 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
