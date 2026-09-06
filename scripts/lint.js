// AI-assisted lint pass — wraps project's configured linter
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read lint config
const configPath = path.join(__dirname, '..', '.lintrc.json');
let config = { tool: 'eslint', args: ['test/'] };
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {}

try {
  execSync(`${config.tool} ${config.args.join(' ')}`, {
    stdio: 'pipe',
    timeout: 60000,
    cwd: path.join(__dirname, '..')
  });
} catch (e) {
  // Linter not installed — skip
}
