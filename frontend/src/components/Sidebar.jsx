import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react"; // you can replace icons

const Sidebar = ({ menuOpen, toggleMenu }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Departments", path: "/departments" },
    { name: "Employees", path: "/employees" },
    { name: "Projects", path: "/projects" },
    { name: "Roles", path: "/roles" },
    { name: "Locations", path: "/locations" },
    { name: "Payroll", path: "/payroll" },
    { name: "Employee Projects", path: "/employee-projects" },
  ];

  return (
    <aside
      className={`fixed md:static z-30 inset-y-0 left-0 transform 
        ${collapsed ? "w-20" : "w-64"} 
        bg-white shadow-lg border-r border-gray-200 
        transition-all duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h3 className="text-lg font-semibold text-gray-800">Databases</h3>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 rounded hover:bg-gray-100 transition"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <ul className="p-2 space-y-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={toggleMenu}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
            >
              {/* Replace with real icons for each menu item */}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
