import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Employees from "../pages/Employees";
import Projects from "../pages/Projects";
import Roles from "../pages/Roles";
import Locations from "../pages/Locations";
import Payroll from "../pages/Payroll";
import EmployeeProjects from "../pages/EmployeeProjects";
import "../App.css";

const Content = () => {
  const routes = [
    { path: "/", element: <Dashboard /> },
    { path: "/departments", element: <Departments /> },
    { path: "/employees", element: <Employees /> },
    { path: "/projects", element: <Projects /> },
    { path: "/roles", element: <Roles /> },
    { path: "/locations", element: <Locations /> },
    { path: "/payroll", element: <Payroll /> },
    { path: "/employee-projects", element: <EmployeeProjects /> },
  ];

  return (
    <main className="App-content">
      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </main>
  );
};

export default Content;
