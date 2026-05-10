"use client";

// TODO: Wire up to /api/v1/metrics/prs endpoint — tracked in issue #9
const MOCK_METRICS = {
  open: 3,
  merged: 24,
  avgReviewTime: "18h",
  mergeRate: "89%",
};

export default function PRMetrics() {
  const stats = [
    { label: "Open PRs", value: MOCK_METRICS.open },
    { label: "Merged (30d)", value: MOCK_METRICS.merged },
    { label: "Avg Review Time", value: MOCK_METRICS.avgReviewTime },
    { label: "Merge Rate", value: MOCK_METRICS.mergeRate },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-white font-semibold text-lg mb-4">PR Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-700 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-indigo-400">
              {stat.value}
            </div>
            <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
