const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

try {
  console.log('Key length:', privateKey.length);
  const keyObject = crypto.createPrivateKey(privateKey);
  console.log('Success! Key type:', keyObject.type);
} catch (err) {
  console.error('Crypto error:', err);
}
