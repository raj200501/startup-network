const mongoose = require('mongoose');
const { resetStore } = require('../../data/inMemoryStore');

const startDatabase = async () => {
  process.env.USE_IN_MEMORY_DB = 'true';
  resetStore();
  return null;
};

const stopDatabase = async (mongoServer) => {
  resetStore();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};

const clearDatabase = async () => {
  resetStore();
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    await Promise.all(
      Object.values(collections).map((collection) => collection.deleteMany({}))
    );
  }
};

module.exports = {
  startDatabase,
  stopDatabase,
  clearDatabase
};
