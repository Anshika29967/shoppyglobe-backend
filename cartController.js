const Cart = require('../models/cartModel');

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if item already in cart
    const existingItem = await Cart.findOne({ user: req.user._id, product: productId });

    if (existingItem) {
      // Update quantity if already exists
      existingItem.quantity += quantity;
      const updatedItem = await existingItem.save();
      return res.status(200).json(updatedItem);
    }

    // If new item
    const newItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};


const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user._id }).populate('product');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
};


const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItemId = req.params.cartItemId;

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    cartItem.quantity = quantity;
    const updated = await cartItem.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item', error: error.message });
  }
};


const removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Optional: Check if current user is authorized to delete this cart item
    if (cartItem.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this item" });
    }

    await cartItem.deleteOne();

    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error: error.message });
  }
};



module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
};
