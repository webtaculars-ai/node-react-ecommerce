import dotenv from 'dotenv';

// dotenv.config();

export default {
  PORT: process.env.PORT || 3005,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://root:test124@node-ecommerce.lan8zlt.mongodb.net/?retryWrites=true&w=majority&appName=node-ecommerce',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};