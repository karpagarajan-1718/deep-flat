const os = require('os');
const path = require('path');

// Load platform-specific native helpers if available
const arch = `${os.platform()}-${os.arch()}`;
const nativePath = path.join(__dirname, 'native', `${arch}.node`);

try {
  const native = require(nativePath);
  console.log(`[setup] Native helpers loaded (${native.platform()} v${native.version()})`);
} catch (e) {
  console.log(`[setup] No native helpers for ${arch}, using JS fallback`);
}

process.env.NODE_ENV = 'test';
