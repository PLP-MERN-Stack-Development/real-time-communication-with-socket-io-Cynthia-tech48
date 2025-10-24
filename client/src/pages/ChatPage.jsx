import React, { useState } from "react";
import { useSocket } from "../socket/socket";

const ChatRoom = ({ username }) => {
  const { messages, sendMessage, typingUsers, setTyping } = useSocket();
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage, "Global"); // room is 'Global'
    setNewMessage("");
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setTyping(e.target.value.length > 0, "Global");
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`${msg.system ? "text-gray-500 italic" : "text-black"} mb-2`}>
            {!msg.system && <strong>{msg.sender === username ? "You" : msg.sender}: </strong>}
            {msg.message}
          </div>
        ))}
      </div>

      {typingUsers.length > 0 && (
        <div className="text-sm text-gray-500 mb-2">
          {typingUsers.join(", ")} typing...
        </div>
      )}

      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
