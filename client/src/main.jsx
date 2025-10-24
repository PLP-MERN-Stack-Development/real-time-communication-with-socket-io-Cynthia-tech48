import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import ChatRoom from "./components/ChatRoom";

const Main = () => {
  const [username, setUsername] = useState("");

  const handleLogin = (name) => {
    setUsername(name);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {username ? <ChatRoom username={username} /> : <LoginPage onLogin={handleLogin} />}
      </main>
      <Footer />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
