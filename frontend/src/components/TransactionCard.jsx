import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Gift, Trash2 } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-slate-300/60 dark:hover:border-slate-700/60 transition-all duration-200 flex flex-col gap-3">
      
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Section: Circular Icon & Core details */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
            isCredit 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100/40 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30' 
              : 'bg-rose-50 text-rose-600 border-rose-100/40 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30'
          }`}>
            {isCredit ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
          </div>
          
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm truncate">
              {merchant || (isCredit ? 'Deposit' : 'Debit')}
            </span>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 truncate leading-relaxed" title={raw_message}>
              {raw_message}
            </p>
            <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-550 mt-0.5">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Right Section: Amount & Action Dropdowns */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-end gap-1">
            <span className={`text-sm font-black ${
              isCredit ? 'text-emerald-500' : 'text-rose-500'
            }`}>
              {isCredit ? '+' : '-'} ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            
            <div className="flex items-center gap-1.5">
              <select
                value={category}
                onChange={(e) => onUpdateCategory(id, e.target.value)}
                className="text-[10px] font-extrabold bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-750 text-slate-600 dark:text-slate-400 rounded-lg px-2 py-0.5 focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              {onDeleteTransaction && (
                <button
                  onClick={() => onDeleteTransaction(id)}
                  className="p-1 text-slate-400 hover:text-rose-500 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Delete transaction"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Gift rewards savings highlighting badge */}
      {reward_amount > 0 && (
        <div className="px-3 py-1.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 rounded-xl flex items-center gap-1.5 text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400 w-full">
          <Gift size={12} className="shrink-0" />
          <span>Expected Savings: ₹{reward_amount}</span>
        </div>
      )}

    </div>
  );
}
