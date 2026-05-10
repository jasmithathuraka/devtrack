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

export default function ContributionGraph() {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/contributions?days=30")
      .then((r) => r.json())
      .then((res: { data: Record<string, number> }) => {
        const sorted = Object.entries(res.data ?? {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([day, commits]) => ({ day, commits }));
        setData(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-6">
        <div className="h-5 w-48 bg-slate-700 rounded animate-pulse mb-4" />
        <div className="h-[200px] bg-slate-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-white font-semibold text-lg mb-4">
        Commit Activity (Last 30 Days)
      </h2>
      {data.length === 0 ? (
        <p className="text-slate-400 text-sm">No commits in the last 30 days.</p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" hide />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ background: "#1e293b", border: "none" }}
              labelStyle={{ color: "#f8fafc" }}
            />
            <Bar dataKey="commits" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
