import db from '../../config/connection.js';
import { Router } from 'express';

const router = Router();

// get all payroll records
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM payroll');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// get payroll record by id
router.get('/:id', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM payroll WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        next(err);
    }
});

// add a new payroll record
router.post('/', async (req, res, next) => {
    try {
        const { employee_id, amount, pay_date, payment_method } = req.body;
        const [result] = await db.query(
            'INSERT INTO payroll (employee_id, amount, pay_date, payment_method) VALUES (?, ?, ?, ?)',
            [employee_id, amount, pay_date, payment_method]
        );
        res.status(201).json({ id: result.insertId, employee_id, amount, pay_date, payment_method });
    } catch (err) {
        next(err);
    }
});

// update a payroll record
router.put('/:id', async (req, res, next) => {
    try {
        const { employee_id, amount, pay_date, payment_method } = req.body;
        const [result] = await db.query(
            'UPDATE payroll SET employee_id = ?, amount = ?, pay_date = ?, payment_method = ? WHERE id = ?',
            [employee_id, amount, pay_date, payment_method, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }
        res.json({ id: req.params.id, employee_id, amount, pay_date, payment_method });
    } catch (err) {
        next(err);
    }
});

// delete a payroll record
router.delete('/:id', async (req, res, next) => {
    try {
        const [result] = await db.query('DELETE FROM payroll WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

export default router;