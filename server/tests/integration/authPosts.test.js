const test = require('node:test');
const assert = require('node:assert');
const createApp = require('../../app');
const { listen } = require('../helpers/testServer');
const { startDatabase, stopDatabase, clearDatabase } = require('../helpers/db');

let mongoServer;
let server;
let url;

test.before(async () => {
  mongoServer = await startDatabase();
  const app = createApp();
  const serverInfo = await listen(app);
  server = serverInfo.server;
  url = serverInfo.url;
});

test.after(async () => {
  if (server) {
    server.close();
  }
  await stopDatabase(mongoServer);
});

test.beforeEach(async () => {
  await clearDatabase();
});

const registerUser = async (overrides = {}) => {
  const payload = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    ...overrides
  };

  const res = await fetch(`${url}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return res;
};

const loginUser = async (credentials) => {
  const res = await fetch(`${url}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  return res;
};

test('registers, authenticates, and creates a post', async () => {
  const registerRes = await registerUser();
  assert.equal(registerRes.status, 200);
  const { token } = await registerRes.json();
  assert.ok(token);

  const loginRes = await loginUser({
    email: 'test@example.com',
    password: 'password123'
  });
  assert.equal(loginRes.status, 200);

  const postRes = await fetch(`${url}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify({ text: 'First launch updates are live.' })
  });
  assert.equal(postRes.status, 200);

  const createdPost = await postRes.json();
  assert.equal(createdPost.text, 'First launch updates are live.');

  const listRes = await fetch(`${url}/api/posts`, {
    headers: { 'x-auth-token': token }
  });
  assert.equal(listRes.status, 200);
  const posts = await listRes.json();
  assert.equal(posts.length, 1);
});

test('returns structured error responses on validation failures', async () => {
  const res = await registerUser({ email: 'invalid-email', password: '123' });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.error.code, 'validation_error');
  assert.ok(body.errors);
});
