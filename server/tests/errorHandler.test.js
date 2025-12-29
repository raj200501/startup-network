const test = require('node:test');
const assert = require('node:assert');
const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const requestId = require('../middleware/requestId');
const { ApiError } = require('../lib/apiError');
const { listen } = require('./helpers/testServer');

test('error handler returns consistent schema', async (t) => {
  const app = express();
  app.use(requestId());
  app.get('/boom', () => {
    throw new ApiError(418, 'teapot', 'Short and stout', {
      hint: 'Add more espresso'
    });
  });
  app.use(errorHandler);

  const { server, url } = await listen(app);
  t.after(() => server.close());

  const res = await fetch(`${url}/boom`);
  const body = await res.json();

  assert.equal(res.status, 418);
  assert.equal(body.error.code, 'teapot');
  assert.ok(body.error.requestId);
  assert.equal(body.error.details.hint, 'Add more espresso');
});
