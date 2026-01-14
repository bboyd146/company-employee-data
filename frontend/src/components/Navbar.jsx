import React from "react";
import { Menu } from "lucide-react";
import LogoutButton from "./LogoutButton";

const Navbar = ({ toggleMenu }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem("token")
  );

  React.useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));

    // Poll in-case logout happens in same tab (simple and reliable)
    const interval = setInterval(checkAuth, 500);

    // Also listen for storage events (updates from other tabs)
    const onStorage = (e) => {
      if (e.key === "token") checkAuth();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

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
        {isAuthenticated ? <LogoutButton /> : null}
      </div>
    </nav>
  );
};

export default Navbar;
