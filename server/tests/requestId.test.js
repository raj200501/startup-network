const test = require('node:test');
const assert = require('node:assert');
const createApp = require('../app');
const { listen } = require('./helpers/testServer');

test('adds a request id header and body correlation', async (t) => {
  const app = createApp();
  const { server, url } = await listen(app);

  t.after(() => server.close());

  const res = await fetch(`${url}/health`);
  const requestId = res.headers.get('x-request-id');
  const body = await res.json();

  assert.ok(requestId, 'Expected x-request-id header');
  assert.equal(body.requestId, requestId);
});
