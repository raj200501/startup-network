import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const includeExtensions = new Set([
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.css',
  '.md',
  '.yml',
  '.yaml',
  '.svg'
]);
const ignoreDirs = new Set(['node_modules', '.git', 'build', 'dist']);

const walk = (dir, files = []) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoreDirs.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (includeExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
};

const checkFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];
  lines.forEach((line, index) => {
    if (line.includes('\t')) {
      errors.push(`Tab character found at ${filePath}:${index + 1}`);
    }
    if (line.match(/\s+$/) && !line.match(/^\s+$/)) {
      errors.push(`Trailing whitespace at ${filePath}:${index + 1}`);
    }
  });
  return errors;
};

const files = walk(root);
const violations = files.flatMap(checkFile);

if (violations.length > 0) {
  console.error('Lint failed with the following issues:');
  violations.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
} else {
  console.log(`Lint passed (${files.length} files checked).`);
}
