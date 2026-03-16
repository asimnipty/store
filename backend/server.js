const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, PORT, NODE_ENV, API_PREFIX } = require('./config/db');
const auth = require('./middleware/auth');
const productRoutes = require('./routes/products');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(auth.requestLogger);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Backend server is running' });
});

// API Routes
app.use(`${API_PREFIX}/products`, productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler middleware (must be last)
app.use(auth.errorHandler);

// Start server with MongoDB connection
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`\n✓ Backend server running at http://localhost:${PORT}`);
      console.log(`✓ Environment: ${NODE_ENV}`);
      console.log(`✓ Database: MongoDB (store_db)`);
      console.log(`\n📚 API Routes:`);
      console.log(`  GET    /api/products - Get all products`);
      console.log(`  POST   /api/products - Create product`);
      console.log(`  GET    /api/products/:id - Get product by ID`);
      console.log(`  PUT    /api/products/:id - Update product`);
      console.log(`  DELETE /api/products/:id - Delete product`);
      console.log(`  GET    /api/products/category/:category - Get products by category`);
      console.log(`  GET    /health - Health check\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
