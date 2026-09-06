const express = require('express');

const router = express.Router();

const {addToWishlist,getWishlist,removeFromWishlist} = require('../controllers/wishlist-controller');

const authenticateJWT = require('../middleware/auth.middleware');


router.post('/add', authenticateJWT, addToWishlist);

router.get('/', authenticateJWT, getWishlist);

router.delete('/:productId', authenticateJWT, removeFromWishlist);


module.exports = router;