import { createContext, useState, useContext, useEffect } from "react";
import { socket } from "../socket/socket";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on("user_list", (userList) => setUsers(userList));
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("typing_users", (typingList) => setTypingUsers(typingList));

    return () => {
      socket.off("user_list");
      socket.off("receive_message");
      socket.off("typing_users");
    };
  }, []);

  return (
    <ChatContext.Provider value={{ user, setUser, users, messages, setMessages, typingUsers }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
