const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: Array(any),
  status: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now 
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
