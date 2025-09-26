import db from '../../config/connection.js';
import { Router } from 'express';

const router = Router();

// get all roles
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM roles');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// get role by id
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM roles WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// add a new role
router.post('/', async (req, res, next) => {
    try {
        const { title, salary, department_id } = req.body;
        const [result] = await db.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [title, salary, department_id]
        );
        res.status(201).json({ id: result.insertId, title, salary, department_id });
    } catch (err) {
        next(err);
    }
});

// update a role
router.put('/:id', async (req, res, next) => {
    try {
        const { title, salary, department_id } = req.body;
        const [result] = await db.query(
            'UPDATE roles SET title = ?, salary = ?, department_id = ? WHERE id = ?',
            [title, salary, department_id, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.json({ id: req.params.id, title, salary, department_id });
    } catch (err) {
        next(err);
    }
});

// delete a role
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM roles WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

export default router;