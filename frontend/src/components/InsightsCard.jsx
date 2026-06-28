import React from 'react';

export default function InsightsCard({ categoryPercentages = {} }) {
  const foodPct = categoryPercentages['Food'] || 0;
  const travelPct = categoryPercentages['Travel'] || 0;

  return (
    <div className="bg-gradient-to-tr from-emerald-50/70 to-emerald-100/40 dark:from-slate-900 dark:to-emerald-950/20 border border-emerald-200/20 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
      
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
          Financial Insights
        </span>
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-snug">
          How To Manage Money Well?
        </h3>
        
        {/* Dynamic highlights derived from DB state */}
        <div className="flex flex-col gap-1.5 mt-2">
          <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            • Food & Dining represents <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{foodPct.toFixed(0)}%</span> of total volume.
          </p>
          <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            • Travel accounted for <span className="text-blue-700 dark:text-blue-400 font-extrabold">{travelPct.toFixed(0)}%</span> of ledger records.
          </p>
          <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            • Partner yields increased cashback savings by <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">15%</span>.
          </p>
        </div>
      </div>

      <button className="w-fit px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer">
        Learn More
      </button>

    </div>
  );
}
