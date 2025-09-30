import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Sidebar = ({ menuOpen, toggleMenu }) => {
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
    <nav className={`App-menu ${menuOpen ? "open" : ""}`}>
      <h3 className="menu-title">Databases</h3>
      <hr />
      <ul>
        {menuItems.map(item => (
          <li key={item.name}>
            <Link to={item.path} onClick={toggleMenu}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
