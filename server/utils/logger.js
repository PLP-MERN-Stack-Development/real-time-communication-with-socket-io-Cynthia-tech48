const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
const logFile = path.join(logDir, 'server.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function log(...args) {
  const timestamp = new Date().toISOString();
  const message = args
    .map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
    .join(' ');
  const line = `[${timestamp}] ${message}\n`;
  console.log(`\x1b[36m${line.trim()}\x1b[0m`);
  try {
    fs.appendFileSync(logFile, line, 'utf8');
  } catch (err) {
    console.error(`[LOGGER ERROR] Failed to write log: ${err.message}`);
  }
}

module.exports = log;
