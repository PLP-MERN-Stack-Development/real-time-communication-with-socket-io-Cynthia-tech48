const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'server.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  console.log(line.trim());
  fs.appendFileSync(logFile, line);
}

module.exports = log;
