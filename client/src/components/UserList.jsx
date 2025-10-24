 import { useChat } from "../context/ChatContext";

export default function UserList() {
  const { users, typingUsers } = useChat();
  return (
    <div className="bg-white rounded-lg p-3 shadow-md mb-4">
      <h2 className="font-bold mb-2">Online Users</h2>
      <ul className="space-y-1">
        {users.map((u) => (
          <li key={u.id} className="text-sm">
            {u.username}{" "}
            {typingUsers.includes(u.username) && (
              <span className="text-blue-500 italic">typing...</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
