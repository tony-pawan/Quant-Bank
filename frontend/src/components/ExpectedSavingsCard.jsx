import React from 'react';

export default function ExpectedSavingsCard({ savingsTotal = 0 }) {
  // Let's assume a savings goal target of ₹500
  const target = 500;
  const percentage = Math.min((savingsTotal / target) * 100, 100);
  
  // Circumference of our semi-circle path of radius 35 is roughly 110.
  const strokeDasharray = 110;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  // Determine saving wellness status
  let statusText = "Standard";
  let statusStyle = "text-slate-500 dark:text-slate-400";
  if (savingsTotal >= 200) {
    statusText = "Excellent";
    statusStyle = "text-emerald-500 dark:text-emerald-400";
  } else if (savingsTotal >= 100) {
    statusText = "Good";
    statusStyle = "text-blue-500 dark:text-blue-400";
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col items-center justify-between h-full min-h-[260px]">
      
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
          Expected Savings
        </span>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer">
          See More
        </span>
      </div>

      {/* Radial Meter visualization */}
      <div className="relative w-full max-w-[140px] flex items-center justify-center mt-2">
        <svg viewBox="0 0 100 65" className="w-full overflow-visible">
          <defs>
            <linearGradient id="savingsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />     {/* Danger red start */}
              <stop offset="50%" stopColor="#f59e0b" />    {/* Amber middle */}
              <stop offset="100%" stopColor="#34d399" />   {/* Emerald green end */}
            </linearGradient>
          </defs>
          
          {/* Underlay arc path */}
          <path 
            d="M 15 55 A 35 35 0 0 1 85 55" 
            stroke="#f1f5f9" 
            dark-stroke="#334155"
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round" 
          />
          
          {/* Active arc path */}
          <path 
            d="M 15 55 A 35 35 0 0 1 85 55" 
            stroke="url(#savingsGrad)" 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round" 
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Text inside the radial meter */}
        <div className="absolute top-[45%] flex flex-col items-center">
          <span className="text-lg font-black text-slate-800 dark:text-slate-100 leading-none">
            ₹{savingsTotal.toFixed(0)}
          </span>
          <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-wider ${statusStyle}`}>
            {statusText}
          </span>
        </div>
      </div>

      {/* Button CTA */}
      <button className="w-full mt-3 py-2 bg-blue-50 hover:bg-blue-100/80 dark:bg-blue-950/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-extrabold text-xs rounded-xl shadow-sm transition-colors cursor-pointer text-center">
        Explore Benefits
      </button>

    </div>
  );
}
