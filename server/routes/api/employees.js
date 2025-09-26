import db from '../../config/connection.js';
import { Router } from 'express';

const router = Router();

// Get all employees
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM employee');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// Get employee by ID
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// Get employees with roles + departments
router.get("/with-roles", async (req, res) => {
    try {
        const [rows] = await db.query(`
    SELECT e.first_name, e.last_name, r.title AS role, d.dep_name AS department
    FROM employee e
    JOIN roles r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new employee
router.post('/', async (req, res, next) => {
    try {
        const { first_name, last_name, role_id, manager_id, hire_date } = req.body;
        const [result] = await db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id, hire_date) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, role_id, manager_id, hire_date]
        );
        res.status(201).json({ id: result.insertId, first_name, last_name, role_id, manager_id, hire_date });
    } catch (err) {
        next(err);
    }
});

// Update an employee
router.put('/:id', async (req, res, next) => {
    try {
        const { first_name, last_name, role_id, manager_id, hire_date } = req.body;
        const [result] = await db.query(
            'UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?, hire_date = ? WHERE id = ?',
            [first_name, last_name, role_id, manager_id, hire_date, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ id: req.params.id, first_name, last_name, role_id, manager_id, hire_date });
    } catch (err) {
        next(err);
    }
});

// Delete an employee
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM employee WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

export default router;