import React, { useState } from "react";
import { useSocket } from "../socket/socket";

const ChatRoom = () => {
  const { messages, sendMessage, users, typingUsers } = useSocket();
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message.trim());
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800">Chat Room</h2>
        <div className="text-gray-600">
          Online: {users.length} | Typing: {typingUsers.join(", ")}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-inner mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            {msg.system ? (
              <p className="text-gray-500 text-sm italic">{msg.message}</p>
            ) : (
              <p>
                <span className="font-semibold text-blue-500">{msg.sender}:</span>{" "}
                <span className="text-gray-700">{msg.message}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>

      {/* Footer */}
      <footer className="mt-4 text-center text-gray-500 text-sm">
        &copy; 2025 ChatApp. All rights reserved.
      </footer>
    </div>
  );
};

export default ChatRoom;
