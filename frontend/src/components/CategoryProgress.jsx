import React from 'react';

const CATEGORY_LABELS = {
  "Food": "Food & Dining",
  "Travel": "Travel",
  "Salary": "Salary & Income",
  "Miscellaneous": "Miscellaneous"
};

const CATEGORY_COLORS = {
  "Food": "bg-amber-500 dark:bg-amber-600",
  "Travel": "bg-sky-500 dark:bg-sky-600",
  "Salary": "bg-emerald-500 dark:bg-emerald-600",
  "Miscellaneous": "bg-slate-400 dark:bg-slate-500"
};

export default function CategoryProgress({ categoryTotals = {}, categoryPercentages = {} }) {
  const categories = ["Food", "Travel", "Salary", "Miscellaneous"];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
        Category Volume
      </h3>
      <div className="flex flex-col gap-4">
        {categories.map(cat => {
          const total = categoryTotals[cat] || 0;
          const percentage = categoryPercentages[cat] || 0;
          const label = CATEGORY_LABELS[cat] || cat;
          const color = CATEGORY_COLORS[cat] || "bg-brand-500";

          return (
            <div key={cat} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">{label}</span>
                <span className="text-slate-800 dark:text-slate-200">
                  ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({percentage}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
