const express = require('express');

const router = express.Router();

const {addToCart,getCart,updateCartQuantity,removeFromCart,clearCart} = require('../controllers/shopping-controller');

const authenticateJWT = require('../middleware/auth.middleware');


router.post('/add',authenticateJWT,addToCart);

router.get('/',authenticateJWT,getCart);

router.put('/:productId',authenticateJWT, updateCartQuantity);

router.delete('/:productId',authenticateJWT,removeFromCart);
router.delete('/', authenticateJWT, clearCart);


module.exports = router;