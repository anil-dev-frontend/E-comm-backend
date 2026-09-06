const express = require('express');

const router = express.Router();

const {createOrder,getOrders,getOrderById,updateOrderStatus,deleteOrder} = require('../controllers/order-controller');


// Create Order
router.post('/create', createOrder);


// Get All Orders
router.get('/list', getOrders);


// Get Single Order
router.get('/:id', getOrderById);


// Update Order Status
router.put('/:id/status', updateOrderStatus);


// Delete Order
router.delete('/:id', deleteOrder);


module.exports = router;