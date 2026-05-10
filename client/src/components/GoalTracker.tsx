"use client";

import { useState } from "react";

interface Goal {
  id: number;
  label: string;
  target: number;
  current: number;
}

// TODO: Persist goals to backend — tracked in issue #10
const INITIAL_GOALS: Goal[] = [
  { id: 1, label: "Commits this week", target: 10, current: 6 },
  { id: 2, label: "PRs reviewed", target: 5, current: 2 },
  { id: 3, label: "Issues closed", target: 8, current: 5 },
];

export default function GoalTracker() {
  const [goals] = useState<Goal[]>(INITIAL_GOALS);

  return (
    <div className="bg-slate-800 rounded-xl p-6 h-full">
      <h2 className="text-white font-semibold text-lg mb-4">Weekly Goals</h2>
      <ul className="space-y-4">
        {goals.map((goal) => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <li key={goal.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">{goal.label}</span>
                <span className="text-slate-400">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
