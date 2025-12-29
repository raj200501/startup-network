const mongoose = require('mongoose');
const config = require('config');
const connectDB = async (mongoUri = config.get('mongoURI')) => {
  try {
    if (process.env.USE_IN_MEMORY_DB === 'true') {
      console.log('Skipping MongoDB connection (in-memory store enabled).');
      return;
    }
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
