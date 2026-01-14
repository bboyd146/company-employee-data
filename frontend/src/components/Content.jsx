import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Employees from "../pages/Employees";
import Projects from "../pages/Projects";
import Roles from "../pages/Roles";
import Locations from "../pages/Locations";
import Payroll from "../pages/Payroll";
import EmployeeProjects from "../pages/EmployeeProjects";

const Content = () => {
  const routes = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    { path: "/", element: <RequireAuth><Dashboard /></RequireAuth> },
    { path: "/departments", element: <RequireAuth><Departments /></RequireAuth> },
    { path: "/employees", element: <RequireAuth><Employees /></RequireAuth> },
    { path: "/projects", element: <RequireAuth><Projects /></RequireAuth> },
    { path: "/roles", element: <RequireAuth><Roles /></RequireAuth> },
    { path: "/locations", element: <RequireAuth><Locations /></RequireAuth> },
    { path: "/payroll", element: <RequireAuth><Payroll /></RequireAuth> },
    { path: "/employee-projects", element: <RequireAuth><EmployeeProjects /></RequireAuth> },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </main>
  );
};

export default Content;
