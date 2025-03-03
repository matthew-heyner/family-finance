import mongoose from 'mongoose';
import { logger } from '../utils/logger';

// Load environment variables
require('dotenv').config();

// Hardcoded MongoDB connection string for local Docker setup
const MONGODB_URI = 'mongodb://mongo-admin:mongo-admin@localhost:27017/family-finance?authSource=admin&directConnection=true';

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    // Add connection options to handle authentication and other settings
    const conn = await mongoose.connect(MONGODB_URI);
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error connecting to MongoDB: ${error.message}`);
      
      // Log more detailed error information
      if (error.message.includes('authentication')) {
        logger.error('Authentication failed. Check your MongoDB username and password.');
      } else if (error.message.includes('ECONNREFUSED')) {
        logger.error('Connection refused. Make sure MongoDB is running and accessible.');
      }
    } else {
      logger.error('Unknown error connecting to MongoDB');
    }
    
    // Don't exit the process on connection failure in development
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// Call the connect function
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to app termination');
  process.exit(0);
});

export default mongoose.connection; 