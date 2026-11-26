const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows / ISP DNS resolvers failing SRV queries (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // If setServers is restricted or fails, continue
}

let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  if (connectionPromise) {
    return connectionPromise;
  }

  // On Vercel serverless, skip connecting if MONGO_URI is not configured
  if (process.env.VERCEL && !process.env.MONGO_URI) {
    console.log('ℹ️  MONGO_URI not set in Vercel environment. Using in-memory question bank.');
    return;
  }

  let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nimcet_prep';

  // Automatically ensure database name is specified for Atlas clusters
  if (uri.startsWith('mongodb+srv://')) {
    if (uri.includes('.mongodb.net/?')) {
      uri = uri.replace('.mongodb.net/?', '.mongodb.net/nimcet_prep?');
    } else if (uri.endsWith('.mongodb.net/')) {
      uri = uri + 'nimcet_prep?retryWrites=true&w=majority';
    } else if (uri.endsWith('.mongodb.net')) {
      uri = uri + '/nimcet_prep?retryWrites=true&w=majority';
    }
  }

  const timeoutMs = process.env.VERCEL ? 6000 : 25000;

  connectionPromise = (async () => {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: timeoutMs,
        connectTimeoutMS: timeoutMs
      });
      console.log(`✅ MongoDB Connected to database: ${conn.connection.host}`);
      isConnected = true;

      // Auto-check if questions collection is empty; if so, populate automatically
      try {
        const Question = require('../models/Question');
        const count = await Question.countDocuments();
        if (count === 0) {
          console.log('🔄 MongoDB Atlas database is empty. Auto-seeding 10-Yr NIMCET & CAT Reasoning dataset...');
          const { autoSeed } = require('./autoSeed');
          await autoSeed();
          const newCount = await Question.countDocuments();
          console.log(`✅ Auto-seed completed successfully with ${newCount} questions!`);
        } else {
          console.log(`📚 Database contains ${count} questions ready for practice!`);
        }
      } catch (seedErr) {
        console.warn('⚠️ Seeding check skipped:', seedErr.message);
      }
    } catch (error) {
      console.log(`ℹ️  MongoDB unavailable (${error.message}). Falling back to in-memory question bank.`);
      connectionPromise = null;
    }
  })();

  return connectionPromise;
};

module.exports = connectDB;
