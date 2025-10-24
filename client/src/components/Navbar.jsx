// components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-sky-400">ChatApp</h1>
        <div>
          <button className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
