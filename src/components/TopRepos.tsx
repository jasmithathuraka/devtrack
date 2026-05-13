"use client";

import { useEffect, useState } from "react";

interface Repo {
  name: string;
  commits: number;
  url: string;
}

export default function TopRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/metrics/repos?days=${days}`)
      .then((r) => r.json())
      .then((d: { repos: Repo[] }) => setRepos(d.repos ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [days]);

  const maxCommits = repos[0]?.commits ?? 1;

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Top Repositories</h2>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="bg-slate-700 text-slate-300 text-sm rounded-lg px-2 py-1 border border-slate-600 focus:outline-none focus:border-indigo-500"
        >
          <option value={7}>Last 7d</option>
          <option value={30}>Last 30d</option>
          <option value={90}>Last 90d</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-slate-700 rounded animate-pulse" />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <p className="text-slate-400 text-sm">No commits in the last {days} days.</p>
      ) : (
        <ul className="space-y-3">
          {repos.map((repo, idx) => {
            const barWidth = Math.max(
              Math.round((repo.commits / maxCommits) * 100),
              4
            );
            const shortName = repo.name.split("/")[1] ?? repo.name;
            return (
              <li key={repo.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-indigo-400 transition-colors truncate max-w-[70%]"
                    title={repo.name}
                  >
                    <span className="text-slate-500 mr-1">#{idx + 1}</span>
                    {shortName}
                  </a>
                  <span className="text-slate-400 shrink-0">
                    {repo.commits} commit{repo.commits !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
