const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = razorpay;


// rzp_test_TZ3nnM7qaFDVeE

// u4xom54lqVQiRhY7psYxDRu5