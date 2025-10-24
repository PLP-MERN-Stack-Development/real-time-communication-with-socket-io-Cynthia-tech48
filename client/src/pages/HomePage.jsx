import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { socket } from "../socket/socket";

export default function HomePage() {
  const { setUser } = useChat();
  const [username, setUsername] = useState("");

  const joinChat = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setUser(username);
    socket.emit("user_join", username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Join Chat</h1>
        <form onSubmit={joinChat}>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full p-2 border rounded-lg mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
}
