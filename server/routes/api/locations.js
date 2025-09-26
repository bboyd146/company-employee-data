import db from '../../config/connection.js';
import { Router } from 'express';

const router = Router();

// get all locations
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM location');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// get location by id
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM location WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// add a new location
router.post('/', async (req, res, next) => {
    try {
        const { address, city, state, country } = req.body;
        const [result] = await db.query(
            'INSERT INTO location (address, city, state, country) VALUES (?, ?, ?, ?)',
            [address, city, state, country]
        );
        res.status(201).json({ id: result.insertId, city, state, country });
    } catch (err) {
        next(err);
    }
});

// update a location
router.put('/:id', async (req, res, next) => {
    try {
        const { address, city, state, country } = req.body;
        const [result] = await db.query(
            'UPDATE location SET address = ?, city = ?, state = ?, country = ? WHERE id = ?',
            [address, city, state, country, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json({ id: req.params.id, address, city, state, country });
    } catch (err) {
        next(err);
    }
});

// delete a location
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM location WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (err) {
        next(err);
    }
});

export default router;