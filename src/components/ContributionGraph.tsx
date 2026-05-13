"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DayData {
  day: string;
  commits: number;
}

const RANGES = [
  { label: "7d", days: 7 },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

export default function ContributionGraph() {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/metrics/contributions?days=${days}`)
      .then((r) => r.json())
      .then((res: { data: Record<string, number> }) => {
        const sorted = Object.entries(res.data ?? {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([day, commits]) => ({ day, commits }));
        setData(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [days]);

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Commit Activity</h2>
        <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                days === r.days
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-[200px] bg-slate-700 rounded animate-pulse" />
      ) : data.length === 0 ? (
        <p className="text-slate-400 text-sm h-[200px] flex items-center">
          No commits in the last {days} days.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" hide />
            <YAxis stroke="#94a3b8" allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: "#1e293b", border: "none", borderRadius: "8px" }}
              labelStyle={{ color: "#f8fafc", fontSize: "12px" }}
              cursor={{ fill: "#334155" }}
            />
            <Bar dataKey="commits" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
