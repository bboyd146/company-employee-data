import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeesPage from './EmployeesPage';
import DepartmentsPage from './DepartmentsPage';
import ProjectsPage from './ProjectsPage';
import RolesPage from './RolesPage';
import LocationsPage from './LocationsPage';
import PayrollPage from './PayrollPage';
import EmployeeProjects from './EmployeeProjects';
import HomePage from './HomePage';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Sidebar menu items
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Departments", path: "/departments" },
    { name: "Employees", path: "/employees" },
    { name: "Projects", path: "/projects" },
    { name: "Roles", path: "/roles" },
    { name: "Locations", path: "/locations" },
    { name: "Payroll", path: "/payroll" },
    { name: "Employee Projects", path: "/employee-projects" },
  ];

  // Routes for main content
  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/departments", element: <DepartmentsPage /> },
    { path: "/employees", element: <EmployeesPage /> },
    { path: "/projects", element: <ProjectsPage /> },
    { path: "/roles", element: <RolesPage /> },
    { path: "/locations", element: <LocationsPage /> },
    { path: "/payroll", element: <PayrollPage /> },
    { path: "/employee-projects", element: <EmployeeProjects /> },
  ];

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="App-header">
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          <div className="header-text">
            <h1>Company Database Portal</h1>
            <p className="subtitle">Welcome! Select a section from the menu.</p>
          </div>
        </header>

        {/* Body containing sidebar and main content */}
        <div className="App-body">
          {/* Sidebar menu */}
          <nav className={`App-menu ${menuOpen ? 'open' : ''}`}>
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

          {/* Main content area */}
          <main className="App-content">
            <Routes>
              {routes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

