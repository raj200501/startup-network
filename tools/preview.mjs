import { spawnSync, spawn } from 'node:child_process';

const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const serverProcess = spawn('node', ['server/server.js'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

serverProcess.on('close', (code) => {
  process.exit(code ?? 0);
});
