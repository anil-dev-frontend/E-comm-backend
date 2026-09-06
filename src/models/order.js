const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  // Cart Products
  items: [
    {
      type: mongoose.Schema.Types.Mixed
    }
  ],

  // Order Status
  status: {
    type: Number,
    default: 0
  },

  // Payment Type
  paymentType: {
    type: String,
    enum: ['cash', 'card'],
    default: 'cash'
  },

  // Delivery Address
  address: {
    type: mongoose.Schema.Types.Mixed,
  },

  // Order Date
  date: {
    type: Date,
    default: Date.now
  }

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
