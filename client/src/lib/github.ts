const GITHUB_API = "https://api.github.com";

export async function fetchUserEvents(
  username: string,
  token: string
): Promise<GitHubEvent[]> {
  const res = await fetch(`${GITHUB_API}/users/${username}/events/public`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchUserRepos(
  username: string,
  token: string
): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=pushed&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  open_issues_count: number;
  stargazers_count: number;
  pushed_at: string;
}
