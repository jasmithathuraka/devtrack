"use client";

import {
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

// TODO: Replace with real API data — tracked in issue #8
const MOCK_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  commits: Math.floor(Math.random() * 12),
}));

export default function ContributionGraph() {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-white font-semibold text-lg mb-4">
        Commit Activity (Last 30 Days)
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={MOCK_DATA}>
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
    </div>
  );
}
