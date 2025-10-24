const log = require('../utils/logger');

let messages = [];

function addMessage({ sender, message, isPrivate = false, to = null }) {
  const newMessage = {
    id: Date.now(),
    sender,
    message,
    isPrivate,
    to,
    timestamp: new Date().toISOString(),
  };
  messages.push(newMessage);
  if (messages.length > 100) messages.shift();
  log('New message:', newMessage);
  return newMessage;
}

function getMessages() {
  return messages;
}

module.exports = { addMessage, getMessages };
