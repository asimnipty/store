import { Request, Response } from 'express';
import { products } from '../data/db';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
