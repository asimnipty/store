import express from 'express';
import { register, login, getProfile, updateProfile, addToCart, removeFromCart, updateCartQuantity, clearCart, createOrder } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', register);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', login);

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, getProfile);

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, updateProfile);

// @desc    Add item to cart
// @route   POST /api/auth/cart/add
// @access  Private
router.post('/cart/add', protect, addToCart);

// @desc    Remove item from cart
// @route   DELETE /api/auth/cart/:productId
// @access  Private
router.delete('/cart/:productId', protect, removeFromCart);

// @desc    Update cart item quantity
// @route   PUT /api/auth/cart/:productId
// @access  Private
router.put('/cart/:productId', protect, updateCartQuantity);

// @desc    Clear cart
// @route   DELETE /api/auth/cart/clear
// @access  Private
router.delete('/cart/clear', protect, clearCart);

// @desc    Create order from cart
// @route   POST /api/auth/orders
// @access  Private
router.post('/orders', protect, createOrder);

export default router;