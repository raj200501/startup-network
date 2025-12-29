const store = {
  users: [],
  posts: []
};

const getStore = () => store;

const resetStore = () => {
  store.users = [];
  store.posts = [];
};

module.exports = {
  getStore,
  resetStore
};
