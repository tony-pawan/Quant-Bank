import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jun', value: 3000, color: '#c7d2fe' },
  { name: 'Jul', value: 4500, color: '#c7d2fe' },
  { name: 'Aug', value: 3200, color: '#c7d2fe' },
  { name: 'Sep', value: 8250, color: '#7c9cf5' }, // Highlighted/Current
  { name: 'Oct', value: 4000, color: '#c7d2fe' },
  { name: 'Nov', value: 5000, color: '#c7d2fe' },
  { name: 'Dec', value: 3800, color: '#c7d2fe' }
];

export default function SpendingCard() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
      
      {/* Selector dropdown header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
          Spending
        </span>
        
        <select className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-lg px-2 py-1 focus:outline-none cursor-pointer">
          <option>Month</option>
          <option>Week</option>
        </select>
      </div>

      {/* Info label details */}
      <div className="flex flex-col mt-3">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          September Spend
        </span>
        <span className="text-xl font-black text-slate-850 dark:text-slate-100">
          ₹8,250.00
        </span>
      </div>

      {/* Recharts Bar Chart */}
      <div className="w-full h-24 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 650 }}
            />
            <Tooltip
              formatter={(value) => [`₹${value}`, 'Spend']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '10px'
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
