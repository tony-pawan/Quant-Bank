import React from 'react';
import TransactionCard from './TransactionCard';
import { Search, Inbox } from 'lucide-react';

const CATEGORIES = ["Food", "Travel", "Salary", "Miscellaneous"];

export default function TransactionList({ 
  transactions, 
  onUpdateCategory, 
  onDeleteTransaction,
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search and Filters Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search merchant or SMS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex w-full sm:w-auto items-center justify-end gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 w-1/2 sm:w-auto">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-auto text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 w-1/2 sm:w-auto">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Scroll List */}
      <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1">
        {transactions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <Inbox size={40} className="text-slate-300 dark:text-slate-600 mb-3" />
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">No transactions matches</span>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs leading-relaxed">
              No matching records found. Try adjusting filters or create a new manual alert to test.
            </p>
          </div>
        ) : (
          transactions.map(tx => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              onUpdateCategory={onUpdateCategory}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))
        )}
      </div>
    </div>
  );
}
