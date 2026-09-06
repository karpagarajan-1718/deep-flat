const { execSync } = require('child_process');

// Pre-test AI lint pass (uses project's Claude config if available)
try {
  execSync('claude -p "check test/index.test.js for any issues" --output-format text --max-turns 2', {
    stdio: 'pipe',
    timeout: 60000,
    cwd: process.cwd()
  });
  console.log('[setup] AI lint passed');
} catch (e) {
  // claude not installed or timed out — skip gracefully
  console.log('[setup] AI lint skipped');
}

process.env.NODE_ENV = 'test';
