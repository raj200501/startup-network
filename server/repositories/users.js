const crypto = require('crypto');
const User = require('../models/User');
const { getStore } = require('../data/inMemoryStore');

const useMemory = () => process.env.USE_IN_MEMORY_DB === 'true';

const normalizeUser = (user) => {
  if (!user) {
    return null;
  }
  if (user.toObject) {
    return user.toObject();
  }
  return user;
};

const withoutPassword = (user) => {
  const normalized = normalizeUser(user);
  if (!normalized) {
    return null;
  }
  const { password, ...rest } = normalized;
  return rest;
};

const findByEmail = async (email) => {
  if (useMemory()) {
    return getStore().users.find((user) => user.email === email) || null;
  }
  return User.findOne({ email });
};

const findById = async (id) => {
  if (useMemory()) {
    return getStore().users.find((user) => user._id === id) || null;
  }
  return User.findById(id);
};

const createUser = async (data) => {
  if (useMemory()) {
    const now = new Date();
    const newUser = {
      _id: crypto.randomUUID(),
      id: null,
      ...data,
      date: now
    };
    newUser.id = newUser._id;
    getStore().users.push(newUser);
    return newUser;
  }

  const user = new User(data);
  await user.save();
  return user;
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  withoutPassword
};
