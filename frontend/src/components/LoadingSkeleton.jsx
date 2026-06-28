import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6 w-full">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 h-24 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-2 w-2/3">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
            </div>
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side Skeleton */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 h-[320px] shadow-sm"></div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 h-[240px] shadow-sm"></div>
        </div>

        {/* Right Side Skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-4 h-16 shadow-sm"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 h-28 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 w-1/2">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0"></div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
