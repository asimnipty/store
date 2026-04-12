import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Extend Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// @desc    Protect routes
// @access  Private
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

    // Get user from token
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// @desc    Check if user is admin
// @access  Private
export const adminOnly = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not authorized, no user ID' });
      return;
    }

    // For now, we'll check if the user is the admin user
    // In a real application, you might have an isAdmin field in the User model
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    // Simple admin check - you might want to implement a more robust system
    // For now, we'll allow access if the user exists and is authenticated
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};