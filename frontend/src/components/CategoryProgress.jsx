import React from 'react';
import { Utensils, Compass, Briefcase, Layers } from 'lucide-react';

const CATEGORY_DETAILS = {
  "Food": {
    label: "Food & Dining",
    color: "bg-amber-400 dark:bg-amber-500",
    icon: Utensils,
    iconStyle: "bg-amber-50 text-amber-500 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100/30"
  },
  "Travel": {
    label: "Travel & Transit",
    color: "bg-sky-400 dark:bg-sky-500",
    icon: Compass,
    iconStyle: "bg-sky-50 text-sky-500 dark:bg-sky-950/20 dark:text-sky-400 border-sky-100/30"
  },
  "Salary": {
    label: "Salary & Deposits",
    color: "bg-emerald-400 dark:bg-emerald-500",
    icon: Briefcase,
    iconStyle: "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100/30"
  },
  "Miscellaneous": {
    label: "Miscellaneous",
    color: "bg-slate-400 dark:bg-slate-500",
    icon: Layers,
    iconStyle: "bg-slate-50 text-slate-500 dark:bg-slate-950/20 dark:text-slate-400 border-slate-100/30"
  }
};

export default function CategoryProgress({ categoryTotals = {}, categoryPercentages = {} }) {
  const categories = ["Food", "Travel", "Salary", "Miscellaneous"];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">
        Category Allocation
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(cat => {
          const total = categoryTotals[cat] || 0;
          const percentage = categoryPercentages[cat] || 0;
          const details = CATEGORY_DETAILS[cat] || {
            label: cat,
            color: "bg-blue-400",
            icon: Layers,
            iconStyle: "bg-blue-50 text-blue-500"
          };
          
          const Icon = details.icon;

          return (
            <div 
              key={cat} 
              className="bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl p-3 flex flex-col justify-between gap-3 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${details.iconStyle}`}>
                  <Icon size={14} />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                  {details.label}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-slate-400">
                    {percentage.toFixed(0)}% weight
                  </span>
                  <span className="text-xs font-extrabold text-slate-850 dark:text-slate-100">
                    ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                
                {/* Visual Progress Line */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${details.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
