const crypto = require('crypto');
const Post = require('../models/Post');
const { getStore } = require('../data/inMemoryStore');

const useMemory = () => process.env.USE_IN_MEMORY_DB === 'true';

const normalizePost = (post) => {
  if (!post) {
    return null;
  }
  if (post.toObject) {
    return post.toObject();
  }
  return post;
};

const createPost = async (data) => {
  if (useMemory()) {
    const now = new Date();
    const post = {
      _id: crypto.randomUUID(),
      ...data,
      likes: [],
      comments: [],
      date: now
    };
    getStore().posts.push(post);
    return post;
  }
  const newPost = new Post(data);
  const saved = await newPost.save();
  return saved;
};

const findAll = async () => {
  if (useMemory()) {
    return getStore()
      .posts.slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return Post.find().sort({ date: -1 });
};

const findById = async (id) => {
  if (useMemory()) {
    return getStore().posts.find((post) => post._id === id) || null;
  }
  return Post.findById(id);
};

const remove = async (post) => {
  if (useMemory()) {
    const store = getStore();
    store.posts = store.posts.filter((item) => item._id !== post._id);
    return;
  }
  await post.remove();
};

const save = async (post) => {
  if (useMemory()) {
    const store = getStore();
    const index = store.posts.findIndex((item) => item._id === post._id);
    if (index >= 0) {
      store.posts[index] = post;
    }
    return post;
  }
  await post.save();
  return post;
};

module.exports = {
  createPost,
  findAll,
  findById,
  remove,
  save,
  normalizePost
};
