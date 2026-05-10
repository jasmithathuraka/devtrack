import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

const GITHUB_API = "https://api.github.com";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = Number(req.nextUrl.searchParams.get("days")) || 30;

  const eventsRes = await fetch(`${GITHUB_API}/user/events?per_page=100`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  if (!eventsRes.ok) {
    return Response.json({ error: "GitHub API error" }, { status: 502 });
  }

  const events = (await eventsRes.json()) as Array<{
    type: string;
    created_at: string;
  }>;

  const since = new Date();
  since.setDate(since.getDate() - days);

  const commitsByDay: Record<string, number> = {};
  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    const date = event.created_at.slice(0, 10);
    if (new Date(date) < since) continue;
    commitsByDay[date] = (commitsByDay[date] ?? 0) + 1;
  }

  return Response.json({ days, data: commitsByDay });
}
