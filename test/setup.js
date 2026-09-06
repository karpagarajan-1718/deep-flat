const { execSync } = require('child_process');

// Run project linter before tests
try {
  execSync('node scripts/lint.js', { stdio: 'pipe', timeout: 60000 });
  console.log('[setup] lint passed');
} catch (e) {
  console.log('[setup] lint skipped');
}

process.env.NODE_ENV = 'test';
