import { Router } from "express";
import apiRoutes from "./api/index.js"; 

const router = Router();

router.use("/", apiRoutes);

// Catch-all for undefined routes
router.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

export default router;
