import db from '../../config/connection.js';
import { Router } from 'express';

const router = Router();

//get all employee projects
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM employee_project');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

//get employee project by id
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM employee_project WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee Project not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

//add a new employee project
router.post('/', async (req, res, next) => {
    try {
        const { employee_id, project_id } = req.body;
        const [result] = await db.query(
            'INSERT INTO employee_project (employee_id, project_id) VALUES (?, ?)',
            [employee_id, project_id]
        );
        res.status(201).json({ id: result.insertId, employee_id, project_id });
    } catch (err) {
        next(err);
    }
});

//update an employee project
router.put('/:id', async (req, res, next) => {
    try {
        const { employee_id, project_id, role_in_project } = req.body;
        const [result] = await db.query(
            'UPDATE employee_project SET employee_id = ?, project_id = ?, role_in_project = ?, WHERE id = ?',
            [employee_id, project_id, role_in_project, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee Project not found' });
        }
        res.json({ id: req.params.id, employee_id, project_id });
    } catch (err) {
        next(err);
    }
});

//delete an employee project
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM employee_project WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee Project not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

export default router;