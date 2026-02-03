import { Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import AppLayout from "./AppLayout";

import LandingPage from "../pages/LandingPage";
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
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected app */}
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/employee-projects" element={<EmployeeProjects />} />
      </Route>
    </Routes>
  );
};

export default Content;
