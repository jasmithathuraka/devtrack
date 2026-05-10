import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const GITHUB_API = "https://api.github.com";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchRes = await fetch(
    `${GITHUB_API}/search/issues?q=type:pr+author:@me&per_page=100`,
    { headers: { Authorization: `Bearer ${session.accessToken}` } }
  );

  if (!searchRes.ok) {
    return Response.json({ error: "GitHub API error" }, { status: 502 });
  }

  const data = (await searchRes.json()) as {
    total_count: number;
    items: Array<{ state: string; created_at: string; closed_at: string | null }>;
  };

  const open = data.items.filter((pr) => pr.state === "open").length;
  const merged = data.items.filter((pr) => pr.state === "closed").length;

  const closedPRs = data.items.filter((pr) => pr.closed_at);
  const avgReviewMs =
    closedPRs.length > 0
      ? closedPRs.reduce(
          (sum, pr) =>
            sum +
            (new Date(pr.closed_at!).getTime() -
              new Date(pr.created_at).getTime()),
          0
        ) / closedPRs.length
      : 0;

  return Response.json({
    open,
    merged,
    total: data.total_count,
    avgReviewHours: Math.round(avgReviewMs / 3600000),
    mergeRate:
      data.total_count > 0
        ? `${Math.round((merged / data.total_count) * 100)}%`
        : "0%",
  });
}
