import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function AnalyticsCharts({ categoryTotals = {} }) {
  // Map our database expense categories to visual display data
  const data = [
    { name: 'Food & Dining', value: categoryTotals['Food'] || 0, color: '#f59e0b' },
    { name: 'Travel', value: categoryTotals['Travel'] || 0, color: '#38bdf8' },
    { name: 'Miscellaneous', value: categoryTotals['Miscellaneous'] || 0, color: '#94a3b8' }
  ].filter(item => item.value > 0);

  const hasData = data.length > 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col h-full min-h-[300px]">
      <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
        Spending Distribution
      </h3>
      
      {hasData ? (
        <div className="flex-1 w-full min-h-[220px] relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(51, 65, 85, 0.5)',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => (
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-10">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            No spending data recorded.
          </p>
        </div>
      )}
    </div>
  );
}
