import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar"; // your existing navbar
import Footer from "./components/Footer"; // your existing footer

const App = () => {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    setLoggedIn(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {!loggedIn ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <ChatRoom username={username} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
