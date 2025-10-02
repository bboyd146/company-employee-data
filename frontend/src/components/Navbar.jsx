import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white px-4 py-3 shadow-md dark:bg-gray-800">
      {/* Hamburger for mobile */}
      <button className="md:hidden" onClick={toggleMenu}>
        <Menu size={24} />
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold">Company Database Portal</h1>

      {/* Placeholder auth buttons */}
      <div className="hidden md:flex space-x-2">
        {/* Future: Login / Signup */}
        {/* <button className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition dark:bg-gray-600">Login</button>
        <button className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition dark:bg-gray-600">Signup</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
