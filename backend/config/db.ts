import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/voltstore', {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error('Please check:');
    console.error('1. Your network connection');
    console.error('2. MongoDB Atlas IP whitelist settings');
    console.error('3. Your MongoDB credentials');
    process.exit(1);
  }
};

export default connectDB;
