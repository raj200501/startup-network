const { execSync } = require('child_process');
const fs = require('fs');

const output = execSync('git diff --numstat HEAD', { encoding: 'utf8' });
const lines = output
  .trim()
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split('\t'));

let added = 0;
let deleted = 0;

for (const [add, del] of lines) {
  if (add === '-' || del === '-') {
    continue;
  }
  added += Number(add);
  deleted += Number(del);
}

const untracked = execSync(
  "git ls-files --others --exclude-standard -- ':!:**/node_modules/**'",
  { encoding: 'utf8' }
)
  .trim()
  .split('\n')
  .filter(Boolean);

for (const filePath of untracked) {
  const stat = fs.statSync(filePath);
  if (stat.isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lineCount = content.split('\n').length;
    added += lineCount;
  }
}

const net = added - deleted;

console.log('Net new LOC (git diff --numstat HEAD + untracked files):');
console.log(`Added: ${added}`);
console.log(`Deleted: ${deleted}`);
console.log(`Net: ${net}`);

if (net < 6000) {
  console.log('LOC requirement NOT met (>= 6000).');
  process.exitCode = 1;
} else {
  console.log('LOC requirement met (>= 6000).');
}
