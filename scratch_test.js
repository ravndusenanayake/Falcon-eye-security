const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.resolve(__dirname, '.env.local'), 'utf8');
const lines = envContent.split('\n');

let privateKey = '';

for (const line of lines) {
  if (line.startsWith('FIREBASE_PRIVATE_KEY=')) {
    let val = line.substring('FIREBASE_PRIVATE_KEY='.length).trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    privateKey = val.replace(/\\n/g, '\n');
  }
}

const keyLines = privateKey.split('\n');
console.log('Total lines:', keyLines.length);
keyLines.forEach((l, i) => {
  console.log(`Line ${i + 1} length: ${l.length}, content preview: ${JSON.stringify(l)}`);
});
