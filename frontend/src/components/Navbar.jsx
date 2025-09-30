import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white px-4 py-3 shadow-md">
      {/* Hamburger for mobile */}
      <button className="md:hidden" onClick={toggleMenu}>
        <Menu size={24} />
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold">Company Database Portal</h1>

      {/* Placeholder auth buttons */}
      <div className="hidden md:flex space-x-2">
        {/* Future: Login / Signup */}
      </div>
    </nav>
  );
};

export default Navbar;
