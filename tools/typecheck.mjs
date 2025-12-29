import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targetDirs = ['server', 'scripts', 'tools'];
const ignoreDirs = new Set(['node_modules', '.git', 'client']);

const gatherFiles = (dir, files = []) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      gatherFiles(fullPath, files);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.mjs')) {
      files.push(fullPath);
    }
  }
  return files;
};

const files = targetDirs.flatMap((dir) => gatherFiles(path.join(root, dir)));

files.forEach((file) => {
  execSync(`node --check "${file}"`, { stdio: 'inherit' });
});

console.log(`Typecheck passed (${files.length} files checked).`);
