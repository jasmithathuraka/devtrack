import { Router } from "express";
import { githubCallback } from "../controllers/githubController";

const router = Router();

// GET /api/v1/auth/github/callback
// Exchanges GitHub OAuth code for access token, returns JWT
router.get("/github/callback", githubCallback);

export default router;
