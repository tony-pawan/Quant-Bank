import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1 Dec', value: 2000 },
  { name: '2 Dec', value: 4500 },
  { name: '3 Dec', value: 3800 },
  { name: '4 Dec', value: 8000 },
  { name: '5 Dec', value: 6500 },
  { name: '6 Dec', value: 10245 }, // Peak day
  { name: '7 Dec', value: 6000 },
  { name: '8 Dec', value: 5000 },
  { name: '9 Dec', value: 6200 },
  { name: '10 Dec', value: 4000 }
];

export default function ExpenseAnalytics() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
      
      {/* Header and selector */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Expenses</span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Daily Trend Pattern
          </span>
        </div>
        
        <select className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-lg px-2 py-1 focus:outline-none cursor-pointer">
          <option>Dec 2026</option>
          <option>Nov 2026</option>
        </select>
      </div>

      {/* Numerical display and highlight badge */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-black text-slate-850 dark:text-slate-100">
          ₹10,245.44
        </span>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-lg border border-emerald-100/50 dark:border-emerald-900/30">
          Peak Day (Dec 06)
        </span>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c9cf5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7c9cf5" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 650 }}
            />
            <Tooltip
              formatter={(value) => [`₹${value}`, 'Spent']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '11px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#7c9cf5" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorExpense)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
