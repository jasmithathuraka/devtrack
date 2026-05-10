import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  githubToken?: string;
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      githubToken: string;
    };
    req.userId = payload.userId;
    req.githubToken = payload.githubToken;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
