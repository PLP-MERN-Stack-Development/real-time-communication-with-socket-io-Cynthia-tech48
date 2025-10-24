import { formatTime } from "../utils/time.js";
import { logEvent } from "../utils/logger.js";
import { addMessage, getAllMessages } from "../models/message.js";

const users = new Map();

export const chatHandler = (io, socket) => {
  // When user joins
  socket.on("join", (username) => {
    users.set(socket.id, username);
    logEvent("connection", `${username} joined`);
    io.emit("userList", Array.from(users.values()));
    io.emit("notification", `${username} joined the chat`);

    // Send chat history to new user
    socket.emit("chatHistory", getAllMessages());
  });

  // When user sends a message
  socket.on("chatMessage", (msg) => {
    const username = users.get(socket.id);
    const message = addMessage(username, msg, formatTime());
    io.emit("message", message);
    logEvent("message", `${username}: ${msg}`);
  });

  // Typing indicator
  socket.on("typing", (isTyping) => {
    const username = users.get(socket.id);
    socket.broadcast.emit("typing", { user: username, isTyping });
  });

  // User disconnects
  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    if (username) {
      users.delete(socket.id);
      io.emit("notification", `${username} left the chat`);
      io.emit("userList", Array.from(users.values()));
      logEvent("disconnect", `${username} disconnected`);
    }
  });
};
