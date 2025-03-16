const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
} = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

// All routes are protected
router.post('/', protect, addToCart);
router.get('/', protect, getCartItems);
router.put('/:cartItemId', protect, updateCartItem); // 👈 UPDATE ROUTE
router.delete('/:cartItemId', protect, removeCartItem);

module.exports = router;
