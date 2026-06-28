import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Award, Trash2 } from 'lucide-react';

const CATEGORIES = ["Food", "Travel", "Salary", "Miscellaneous"];

export default function TransactionCard({ transaction, onUpdateCategory, onDeleteTransaction }) {
  const { id, raw_message, amount, transaction_type, merchant, category, reward_amount, timestamp } = transaction;
  
  const isCredit = transaction_type === 'credit';
  
  const formattedDate = new Date(timestamp).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Icon, Merchant, Raw SMS text, Time */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`p-2.5 rounded-lg shrink-0 ${
            isCredit 
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
              : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
          }`}>
            {isCredit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
          </div>
          
          <div className="flex flex-col gap-1 min-w-0">
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
              {merchant || (isCredit ? 'Deposit' : 'Debit')}
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 break-words line-clamp-2 leading-relaxed" title={raw_message}>
              {raw_message}
            </p>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Right: Amount, Category Selector, Delete button */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0">
          
          <span className={`text-lg font-bold ${
            isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          }`}>
            {isCredit ? '+' : '-'} ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>

          <div className="flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => onUpdateCategory(id, e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            {onDeleteTransaction && (
              <button
                onClick={() => onDeleteTransaction(id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Delete transaction"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          
        </div>
      </div>

      {/* Rewards savings highlighted bar */}
      {reward_amount > 0 && (
        <div className="px-4 py-2 bg-emerald-50/50 dark:bg-emerald-950/20 border-t border-emerald-100/50 dark:border-emerald-900/30 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <Award size={14} className="shrink-0" />
          <span>Expected Savings: ₹{reward_amount}</span>
        </div>
      )}
    </div>
  );
}
