import db from '../../config/connection.js';
import { Router } from 'express';

const router = Router();

// get all projects
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM project');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// get project by id
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM project WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// add a new project
router.post('/', async (req, res, next) => {
    try {
        const { project_name, budget, start_date, end_date, department_id } = req.body;
        const [result] = await db.query(
            'INSERT INTO project (project_name, budget, start_date, end_date, department_id) VALUES (?, ?, ?, ?, ?)',
            [project_name, budget, start_date, end_date, department_id]
        );
        res.status(201).json({ id: result.insertId, project_name, budget, start_date, end_date, department_id });
    } catch (err) {
        next(err);
    }
});

// update a project
router.put('/:id', async (req, res, next) => {
    try {
        const { project_name, budget, start_date, end_date, department_id } = req.body;
        const [result] = await db.query(
            'UPDATE project SET project_name = ?, budget = ?, start_date = ?, end_date = ?, department_id = ? WHERE id = ?',
            [project_name, budget, start_date, end_date, department_id, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ id: req.params.id, project_name, budget, start_date, end_date, department_id });
    } catch (err) {
        next(err);
    }
});

// delete a project
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM project WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

export default router;