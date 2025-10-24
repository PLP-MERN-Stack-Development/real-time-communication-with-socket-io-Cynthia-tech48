import { useState } from "react";
import { socket } from "../socket/socket";
import { useChat } from "../context/ChatContext";

export default function MessageInput() {
  const [text, setText] = useState("");
  const { user } = useChat();

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit("send_message", { message: text, sender: user });
    setText("");
  };

  return (
    <form onSubmit={sendMessage} className="flex items-center gap-2 mt-3">
      <input
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => socket.emit("typing", true)}
        onBlur={() => socket.emit("typing", false)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
}
