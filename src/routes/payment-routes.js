const express = require('express');

const router = express.Router();

const {
    createPaymentOrder,
    verifyPayment
} = require('../controllers/payment-controller');


// Create Razorpay Payment Order
router.post('/create-order', createPaymentOrder);


// Verify Razorpay Payment
router.post('/verify', verifyPayment);


module.exports = router;