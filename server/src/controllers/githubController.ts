import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";

export async function githubCallback(req: Request, res: Response): Promise<void> {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    res.status(400).json({ error: "Missing OAuth code" });
    return;
  }

  try {
    // Exchange code for GitHub access token
    const tokenRes = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };

    if (!tokenData.access_token) {
      res.status(401).json({ error: "GitHub OAuth failed", detail: tokenData.error });
      return;
    }

    // Fetch GitHub user info
    const userRes = await fetch(GITHUB_USER_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const user = (await userRes.json()) as { id: number; login: string };

    // Issue a JWT containing the GitHub token so downstream requests can call GitHub API
    const jwtToken = jwt.sign(
      { userId: String(user.id), githubLogin: user.login, githubToken: tokenData.access_token },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token: jwtToken, user: { id: user.id, login: user.login } });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
