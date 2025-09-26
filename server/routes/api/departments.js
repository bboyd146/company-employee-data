import db from '../../config/connection.js';
import { Router } from 'express';

const router = Router();

// get all departments
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM department');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// get department by id
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM department WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// add a new department
router.post('/', async (req, res, next) => {
    try {
        const { dep_name, location_id } = req.body;
        const [result] = await db.query(
            'INSERT INTO department (dep_name, location_id) VALUES (?, ?)',
            [dep_name, location_id]
        );
        res.status(201).json({ id: result.insertId, dep_name, location_id });
    } catch (err) {
        next(err);
    }
});

// update a department
router.put('/:id', async (req, res, next) => {
    try {
        const { dep_name, location_id } = req.body;
        const [result] = await db.query(
            'UPDATE department SET dep_name = ?, location_id = ? WHERE id = ?',
            [dep_name, location_id, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json({ id: req.params.id, dep_name, location_id });
    } catch (err) {
        next(err);
    }
});

// delete a department
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM department WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json({ message: 'Department deleted' });
    } catch (err) {
        next(err);
    }
});

export default router;