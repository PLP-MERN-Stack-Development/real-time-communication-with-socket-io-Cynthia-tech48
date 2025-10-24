export default function Message({ message, currentUser }) {
  const isOwn = message.sender === currentUser;
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`rounded-2xl px-4 py-2 max-w-xs ${
          isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p className="text-sm font-semibold">{message.sender}</p>
        <p>{message.message}</p>
        <span className="text-[10px] block text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
