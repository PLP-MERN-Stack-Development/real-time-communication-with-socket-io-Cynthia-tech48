const { Server } = require('socket.io');
const log = require('../utils/logger');
const { addMessage } = require('../controllers/messageController');

function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', methods: ['GET', 'POST'] },
  });

  const users = {};
  const typingUsers = {};

  io.on('connection', (socket) => {
    log('User connected:', socket.id);

    socket.on('user_join', (username) => {
      users[socket.id] = { username, id: socket.id };
      io.emit('user_list', Object.values(users));
      io.emit('user_joined', { username, id: socket.id });
      log(`${username} joined`);
    });

    socket.on('send_message', (data) => {
      const sender = users[socket.id]?.username || 'Anonymous';
      const message = addMessage({ sender, message: data.message });
      io.emit('receive_message', message);
    });

    socket.on('private_message', ({ to, message }) => {
      const sender = users[socket.id]?.username || 'Anonymous';
      const privateMsg = addMessage({ sender, message, isPrivate: true, to });
      socket.to(to).emit('private_message', privateMsg);
      socket.emit('private_message', privateMsg);
    });

    socket.on('typing', (isTyping) => {
      const username = users[socket.id]?.username;
      if (!username) return;
      if (isTyping) typingUsers[socket.id] = username;
      else delete typingUsers[socket.id];
      io.emit('typing_users', Object.values(typingUsers));
    });

    socket.on('disconnect', () => {
      const username = users[socket.id]?.username;
      if (username) {
        io.emit('user_left', { username, id: socket.id });
        log(`${username} disconnected`);
      }
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
    });
  });

  return io;
}

module.exports = setupSocket;
