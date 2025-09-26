import express from 'express';
import db from '../../config/connection.js';

const router = express.Router();

/**
 * Employee Overview
 * Employees with roles, departments, locations, and projects
 */
router.get("/employee-overview", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.dep_name AS department, 
            l.city AS location, p.project_name
        FROM employee e
        JOIN roles r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        JOIN location l ON d.location_id = l.id
        LEFT JOIN employee_project ep ON e.id = ep.employee_id
        LEFT JOIN project p ON ep.project_id = p.id
        ORDER BY e.last_name, e.first_name
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Salary Report by Department

router.get("/salary-by-department", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT d.dep_name, AVG(r.salary) AS avg_salary, SUM(r.salary) AS total_salary
        FROM roles r
        JOIN department d ON r.department_id = d.id
        GROUP BY d.dep_name
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Employees and Their Managers

router.get("/employee-managers", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT e.first_name AS employee_first, e.last_name AS employee_last,
            m.first_name AS manager_first, m.last_name AS manager_last
        FROM employee e
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY manager_last, employee_last
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Current Active Projects with Assigned Employees

router.get("/active-projects", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT p.project_name, e.first_name, e.last_name, ep.role_in_project
        FROM project p
        JOIN employee_project ep ON p.id = ep.project_id
        JOIN employee e ON ep.employee_id = e.id
        WHERE p.end_date IS NULL OR p.end_date > CURDATE()
        ORDER BY p.project_name, e.last_name
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Department Projects with Budget Totals
router.get("/department-budgets", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT d.dep_name, COUNT(p.id) AS project_count, SUM(p.budget) AS total_budget
        FROM department d
        LEFT JOIN project p ON d.id = p.department_id
        GROUP BY d.dep_name
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Employee Payroll History

router.get("/payroll-history", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT e.first_name, e.last_name, pr.pay_date, pr.gross_salary, pr.deductions, 
            pr.net_salary, pr.payment_method
        FROM payroll pr
        JOIN employee e ON pr.employee_id = e.id
        ORDER BY e.last_name, pr.pay_date DESC
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Employees with Multiple Projects

router.get("/employees-multiple-projects", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT e.first_name, e.last_name, COUNT(ep.project_id) AS project_count
        FROM employee e
        JOIN employee_project ep ON e.id = ep.employee_id
        GROUP BY e.id
        HAVING project_count > 1
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Employees by Location
router.get("/employees-by-location", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT l.city, l.state, COUNT(e.id) AS employee_count
        FROM location l
        JOIN department d ON l.id = d.location_id
        JOIN roles r ON d.id = r.department_id
        JOIN employee e ON r.id = e.role_id
        GROUP BY l.city, l.state
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Projects Over Budget
router.get("/projects-over-budget", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT p.project_name, p.budget, SUM(pr.net_salary) AS total_paid
        FROM project p
        JOIN employee_project ep ON p.id = ep.project_id
        JOIN payroll pr ON ep.employee_id = pr.employee_id
        GROUP BY p.id
        HAVING total_paid > p.budget
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Payroll Summary by Payment Method
router.get("/payroll-by-method", async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT payment_method, COUNT(*) AS count, SUM(net_salary) AS total_paid
        FROM payroll
        GROUP BY payment_method
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;