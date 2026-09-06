const Order = require('../models/order');

const createOrder = async (req, res) => {
  try {
    const {items,status,paymentType,address} = req.body;
    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: 'Order items are required'
      });
    }

    if (!paymentType) {
      return res.status(400).json({
        message: 'Payment type is required'
      });
    }

    if (!address) {
      return res.status(400).json({
        message: 'Address is required'
      });
    }

    // Create order
    const order = new Order({
      items,
      status: status ?? 0,
      paymentType,
      address
    });

    const savedOrder = await order.save();

    return res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });

  } catch (error) {
    console.error('Create Order Error:', error);

    return res.status(500).json({
      message: 'Failed to place order',
      error: error.message
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ date: -1 });

    return res.status(200).json({
      message: 'Orders fetched successfully',
      orders
    });

  } catch (error) {
    console.error('Get Orders Error:', error);

    return res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      message: 'Order fetched successfully',
      order
    });

  } catch (error) {
    console.error('Get Order Error:', error);

    return res.status(500).json({
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status === undefined) {
      return res.status(400).json({
        message: 'Status is required'
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error('Update Order Status Error:', error);

    return res.status(500).json({
      message: 'Failed to update order status',
      error: error.message
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      message: 'Order deleted successfully'
    });

  } catch (error) {
    console.error('Delete Order Error:', error);

    return res.status(500).json({
      message: 'Failed to delete order',
      error: error.message
    });
  }
};


module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};