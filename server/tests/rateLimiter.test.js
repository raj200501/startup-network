const test = require('node:test');
const assert = require('node:assert');
const express = require('express');
const rateLimiter = require('../middleware/rateLimiter');
const requestId = require('../middleware/requestId');
const errorHandler = require('../middleware/errorHandler');
const { listen } = require('./helpers/testServer');

test('rate limiter blocks requests after max', async (t) => {
  const app = express();
  app.use(requestId());
  app.use('/limited', rateLimiter({ windowMs: 10_000, max: 2 }));
  app.get('/limited', (req, res) => res.json({ ok: true }));
  app.use(errorHandler);

  const { server, url } = await listen(app);
  t.after(() => server.close());

  const first = await fetch(`${url}/limited`);
  const second = await fetch(`${url}/limited`);
  const third = await fetch(`${url}/limited`);

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(third.status, 429);

  const body = await third.json();
  assert.equal(body.error.code, 'rate_limited');
});
