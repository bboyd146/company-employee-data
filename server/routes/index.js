import { Router } from 'express';
import apiRoutes from './api.js';

const router = Router();

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>");
});

export default router;