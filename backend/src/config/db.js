const mongoose = require('mongoose');

// In-memory local database fallback store if MongoDB is not connected
const memoryStore = {
  jobs: [],
  resumes: [],
  applications: [],
  settings: {
    openaiApiKey: '',
    geminiApiKey: '',
    gmailEmail: '',
    gmailAppPassword: '',
    searchKeywords: 'C2C, Corp-to-Corp, 1099, Java, React, Node, DevOps',
    minPayRate: 60,
    autoTailor: true,
    autoSend: false
  }
};

let isConnectedToMongo = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flowhire';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000
    });
    isConnectedToMongo = true;
    console.log(`[Database] MongoDB Connected to ${mongoURI}`);
  } catch (err) {
    isConnectedToMongo = false;
    console.warn(`[Database] MongoDB connection bypassed (${err.message}). Using high-performance in-memory state engine.`);
  }
};

module.exports = {
  connectDB,
  isMongoActive: () => isConnectedToMongo,
  memoryStore
};
