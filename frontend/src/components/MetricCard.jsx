import React from 'react';

export default function MetricCard({ title, value, type, icon: Icon }) {
  const colorMap = {
    income: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400'
    },
    expense: {
      bg: 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400'
    },
    balance: {
      bg: 'bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900/30 text-sky-600 dark:text-sky-400'
    }
  };

  const style = colorMap[type] || colorMap.balance;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
          ₹{value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className={`p-3 rounded-xl border ${style.bg} shrink-0`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
