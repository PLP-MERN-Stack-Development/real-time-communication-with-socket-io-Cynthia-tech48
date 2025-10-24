// src/socket/socket.js
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  // Connect to server and join room
  const connect = (username, room = "Global") => {
    if (!username) return;
    socket.connect();
    socket.emit("user_join", { username, room });
  };

  const disconnect = () => {
    socket.disconnect();
  };

  const sendMessage = (message, room = "Global") => {
    if (!message) return;

    // Optimistically add message to state
    const tempMessage = {
      id: Date.now(),
      sender: socket.id, // temporary sender
      message,
      system: false,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("send_message", { message, room });
  };

  const sendPrivateMessage = (to, message) => {
    socket.emit("private_message", { to, message });
  };

  const setTyping = (isTyping, room = "Global") => {
    socket.emit("typing", { isTyping, room });
  };

  useEffect(() => {
    // Connection events
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    // Message events
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("private_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // User events
    socket.on("user_list", (userList) => setUsers(userList));

    socket.on("user_joined", (user) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), system: true, message: `${user.username} joined the chat` },
      ]);
    });

    socket.on("user_left", (user) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), system: true, message: `${user.username} left the chat` },
      ]);
    });

    // Typing indicator
    socket.on("typing_users", (typing) => setTypingUsers(typing));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
      socket.off("private_message");
      socket.off("user_list");
      socket.off("user_joined");
      socket.off("user_left");
      socket.off("typing_users");
    };
  }, []);

  return {
    socket,
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  };
};

export default socket;
