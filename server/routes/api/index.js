import { Router } from "express";
import employeesRouter from "./employees.js";
import departmentsRouter from "./departments.js";
import rolesRouter from "./roles.js";
import locationsRouter from "./locations.js";
import projectsRouter from "./projects.js";
import employeeProjectsRouter from "./employeeProjects.js";
import payrollRouter from "./payroll.js";

const router = Router();

router.use("/employees", employeesRouter);
router.use("/departments", departmentsRouter);
router.use("/roles", rolesRouter);
router.use("/locations", locationsRouter);
router.use("/projects", projectsRouter);
router.use("/employee-projects", employeeProjectsRouter);
router.use("/payroll", payrollRouter);

export default router;
