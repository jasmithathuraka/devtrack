import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getContributions, getPRMetrics } from "../controllers/metricsController";

const router = Router();

// All metrics routes require a valid JWT
router.use(requireAuth);

// GET /api/v1/metrics/contributions?days=30
router.get("/contributions", getContributions);

// GET /api/v1/metrics/prs
router.get("/prs", getPRMetrics);

export default router;
