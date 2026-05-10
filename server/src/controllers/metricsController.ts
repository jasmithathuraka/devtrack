import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const GITHUB_API = "https://api.github.com";

export async function getContributions(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const days = Number(req.query.days) || 30;
  const { githubToken, userId } = req;

  try {
    // Fetch public events for the authenticated user
    const eventsRes = await fetch(
      `${GITHUB_API}/user/events?per_page=100`,
      { headers: { Authorization: `Bearer ${githubToken}` } }
    );

    if (!eventsRes.ok) {
      res.status(502).json({ error: "GitHub API error" });
      return;
    }

    const events = (await eventsRes.json()) as Array<{
      type: string;
      created_at: string;
    }>;

    const since = new Date();
    since.setDate(since.getDate() - days);

    // Aggregate commit counts per day
    const commitsByDay: Record<string, number> = {};
    for (const event of events) {
      if (event.type !== "PushEvent") continue;
      const date = event.created_at.slice(0, 10);
      if (new Date(date) < since) continue;
      commitsByDay[date] = (commitsByDay[date] ?? 0) + 1;
    }

    res.json({ userId, days, data: commitsByDay });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getPRMetrics(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const { githubToken } = req;

  try {
    const searchRes = await fetch(
      `${GITHUB_API}/search/issues?q=type:pr+author:@me&per_page=100`,
      { headers: { Authorization: `Bearer ${githubToken}` } }
    );

    if (!searchRes.ok) {
      res.status(502).json({ error: "GitHub API error" });
      return;
    }

    const data = (await searchRes.json()) as {
      total_count: number;
      items: Array<{ state: string; created_at: string; closed_at: string | null }>;
    };

    const open = data.items.filter((pr) => pr.state === "open").length;
    const merged = data.items.filter((pr) => pr.state === "closed").length;

    // Average time to close in hours
    const closedPRs = data.items.filter((pr) => pr.closed_at);
    const avgReviewMs =
      closedPRs.length > 0
        ? closedPRs.reduce((sum, pr) => {
            return (
              sum +
              (new Date(pr.closed_at!).getTime() -
                new Date(pr.created_at).getTime())
            );
          }, 0) / closedPRs.length
        : 0;

    const avgReviewHours = Math.round(avgReviewMs / 3600000);

    res.json({
      open,
      merged,
      total: data.total_count,
      avgReviewHours,
      mergeRate:
        data.total_count > 0
          ? `${Math.round((merged / data.total_count) * 100)}%`
          : "0%",
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
