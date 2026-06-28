import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function AddTransactionModal({ onAddTransaction, isLoading }) {
  const [rawMessage, setRawMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rawMessage.trim()) return;
    onAddTransaction(rawMessage);
    setRawMessage('');
  };

  const templates = [
    "Paid Rs.250 to Zomato via UPI",
    "Received Rs.1200 from Company Ltd",
    "Paid Rs.340 to Uber Cashback",
    "Account credited with INR 15000",
    "UPI txn of INR 500 at Swiggy"
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-blue-500" />
        <h3 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          Simulate UPI SMS Alert
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          placeholder="Paste raw bank alert message (e.g. Paid ₹350 at Ola Cabs)..."
          value={rawMessage}
          onChange={(e) => setRawMessage(e.target.value)}
          rows={2}
          className="w-full p-3 text-xs font-semibold bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors resize-none leading-relaxed"
          required
        />
        
        <button
          type="submit"
          disabled={isLoading || !rawMessage.trim()}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-650 text-white font-extrabold text-xs rounded-full shadow-sm transition-all cursor-pointer"
        >
          <Send size={12} />
          {isLoading ? 'Processing...' : 'Parse & Save Transaction'}
        </button>
      </form>
      
      <div className="mt-4">
        <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
          Or select a sample alert to test:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {templates.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRawMessage(tpl)}
              className="text-[10px] font-extrabold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              {tpl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
