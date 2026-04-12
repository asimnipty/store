import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Product from '../models/Product';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
      });
      return;
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      address
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Populate cart products
    await user.populate('cart.productId');

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address,
        cart: user.cart
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, address } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: user._id } });
      if (existingUser) {
        res.status(400).json({ message: 'Email already in use' });
        return;
      }
    }

    // Update user
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/auth/cart/add
// @access  Private
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      res.status(404).json({ message: 'User or product not found' });
      return;
    }

    // Check if product already in cart
    const existingItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      // Update quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({
        productId,
        quantity,
        price: product.price
      });
    }

    await user.save();
    await user.populate('cart.productId');

    res.json({
      success: true,
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/auth/cart/:productId
// @access  Private
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Remove item from cart
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    res.json({
      success: true,
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/auth/cart/:productId
// @access  Private
export const updateCartQuantity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Find and update item quantity
    const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found in cart' });
      return;
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = quantity;
    }

    await user.save();
    await user.populate('cart.productId');

    res.json({
      success: true,
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/auth/cart/clear
// @access  Private
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.cart = [];
    await user.save();

    res.json({
      success: true,
      cart: []
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// @desc    Create order from cart
// @route   POST /api/auth/orders
// @access  Private
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { shippingAddress, paymentMethod } = req.body;

    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.cart.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    // Calculate totals
    const items = user.cart.map(item => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = 50; // Fixed shipping cost
    const total = subtotal + shippingCost;

    // Create order (simplified - would normally have an Order model)
    const order = {
      userId: user._id,
      items,
      subtotal,
      shippingCost,
      total,
      shippingAddress: shippingAddress || user.address,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Pending',
      createdAt: new Date()
    };

    // Clear cart after order
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Server Error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Helper function to generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};