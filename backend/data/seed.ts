import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";
import connectDB from "../config/db";

dotenv.config();

const products = [
  {
    name: "QuantumX Pro Laptop",
    description:
      "Ultra-thin, high-performance laptop with M-series equivalent chip, 32GB RAM, and 1TB SSD. Perfect for professionals and creators.",
    price: 1499.99,
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
    features: [
      "14-inch OLED display",
      "32GB Unified Memory",
      "1TB NVMe SSD",
      "20-hour battery life",
    ],
    inStock: true,
  },
  {
    name: "Aura Noise-Cancelling Headphones",
    description:
      "Industry-leading active noise cancellation with high-fidelity audio and all-day comfort.",
    price: 299.99,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    features: [
      "Active Noise Cancellation",
      "40-hour battery",
      "Bluetooth 5.3",
      "Spatial Audio",
    ],
    inStock: true,
  },
  {
    name: "Nexus 15 Smartphone",
    description:
      "The ultimate smartphone experience with a pro-grade camera system and all-day battery.",
    price: 999.99,
    category: "Phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    features: [
      "6.7-inch AMOLED",
      "Triple 50MP Camera",
      "256GB Storage",
      "5G Ready",
    ],
    inStock: true,
  },
  {
    name: "Nova Smartwatch Series 5",
    description:
      "Advanced health tracking, ECG, and seamless integration with your digital life.",
    price: 349.99,
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
    features: [
      "Always-On Retina Display",
      "Blood Oxygen Sensor",
      "Water Resistant 50m",
      "GPS",
    ],
    inStock: true,
  },
  {
    name: "Vision 4K Monitor",
    description:
      "27-inch 4K UHD monitor with HDR400 and 99% sRGB color accuracy for stunning visuals.",
    price: 450.0,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    features: ["27-inch 4K UHD", "HDR400", "USB-C Hub", "Ergonomic Stand"],
    inStock: true,
  },
  {
    name: "Ergo Mechanical Keyboard",
    description:
      "Wireless mechanical keyboard with tactile switches and customizable RGB backlighting.",
    price: 129.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    features: [
      "Tactile Switches",
      "RGB Backlighting",
      "Wireless/Wired",
      "Hot-swappable",
    ],
    inStock: false,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log("Existing products cleared");

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} products added to database`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
