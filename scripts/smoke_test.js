const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const request = (options) =>
  new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });

    req.on('error', reject);
    req.end();
  });

const waitForServer = async (port, retries = 60, delayMs = 500) => {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const res = await request({
        hostname: '127.0.0.1',
        port,
        path: '/api/posts',
        method: 'GET'
      });

      if (res.statusCode === 401) {
        return res;
      }
    } catch (err) {
      // ignore and retry
    }
    await wait(delayMs);
  }
  throw new Error('Server did not respond in time.');
};

const run = async () => {
  const port = 5100;

  const serverProcess = spawn('node', [path.join('server', 'server.js')], {
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      USE_IN_MEMORY_DB: 'true',
      JWT_SECRET: 'smoke-test-secret',
      PORT: String(port)
    },
    stdio: 'inherit'
  });

  let exitCode = 0;

  try {
    const res = await waitForServer(port);
    if (res.statusCode !== 401) {
      throw new Error(`Unexpected status code: ${res.statusCode}`);
    }
    console.log('Smoke test passed: /api/posts returns 401 without auth token.');
  } catch (err) {
    exitCode = 1;
    console.error(`Smoke test failed: ${err.message}`);
  } finally {
    serverProcess.kill('SIGTERM');
    process.exit(exitCode);
  }
};

run();
