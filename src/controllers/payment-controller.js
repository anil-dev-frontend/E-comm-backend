const crypto = require('crypto');
const razorpay = require('../config/razorpay');


// ============================================
// CREATE RAZORPAY ORDER
// ============================================

const createPaymentOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        // Validation
        if (!amount) {
            return res.status(400).json({
                message: 'Amount is required'
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                message: 'Amount must be greater than 0'
            });
        }

        // Razorpay amount is in paise
        const amountInPaise = Math.round(Number(amount) * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        return res.status(201).json({
            message: 'Payment order created successfully',
            order
        });

    } catch (error) {
        console.error('Create Payment Order Error:', error);

        return res.status(500).json({
            message: 'Failed to create payment order',
            error: error.message
        });
    }
};


// ============================================
// VERIFY PAYMENT
// ============================================

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Validation
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                message: 'Payment verification details are required'
            });
        }

        // Create signature
        const generatedSignature = crypto
            .createHmac(
                'sha256',
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest('hex');

        // Compare signatures
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: 'Payment verification failed'
            });
        }

        return res.status(200).json({
            message: 'Payment verified successfully',
            payment: {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            }
        });

    } catch (error) {
        console.error('Verify Payment Error:', error);

        return res.status(500).json({
            message: 'Failed to verify payment',
            error: error.message
        });
    }
};


module.exports = {
    createPaymentOrder,
    verifyPayment
};