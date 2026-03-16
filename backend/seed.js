const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/ProductSchema');

const sampleProducts = [
  {
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 999.99,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://via.placeholder.com/300x300?text=Laptop'
  },
  {
    name: 'Mouse',
    description: 'Wireless mouse with USB receiver',
    price: 29.99,
    category: 'Accessories',
    stock: 100,
    imageUrl: 'https://via.placeholder.com/300x300?text=Mouse'
  },
  {
    name: 'Keyboard',
    description: 'Mechanical keyboard with RGB lighting',
    price: 79.99,
    category: 'Accessories',
    stock: 50,
    imageUrl: 'https://via.placeholder.com/300x300?text=Keyboard'
  },
  {
    name: 'Monitor',
    description: '27-inch 4K ultra HD monitor',
    price: 299.99,
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://via.placeholder.com/300x300?text=Monitor'
  },
  {
    name: 'USB-C Cable',
    description: '2m USB-C charging and data cable',
    price: 14.99,
    category: 'Accessories',
    stock: 200,
    imageUrl: 'https://via.placeholder.com/300x300?text=Cable'
  },
  {
    name: 'Webcam',
    description: '1080p HD webcam with microphone',
    price: 49.99,
    category: 'Electronics',
    stock: 40,
    imageUrl: 'https://via.placeholder.com/300x300?text=Webcam'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/store_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✓ Inserted ${insertedProducts.length} sample products`);

    console.log('\n📦 Sample Products Added:');
    insertedProducts.forEach(product => {
      console.log(`  - ${product.name}: $${product.price} (Stock: ${product.stock})`);
    });

    await mongoose.disconnect();
    console.log('\n✓ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
