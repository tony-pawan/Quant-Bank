import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';

export default function BalanceCard({ balance, onSend, onReceive }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
      
      {/* Total Balance Amount */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Total Balance
        </span>
        <span className="text-4.5xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none">
          ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Pill buttons for Send & Receive */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onSend}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold rounded-full border border-slate-200/40 dark:border-slate-700/40 transition-colors cursor-pointer"
        >
          <div className="p-1 bg-white dark:bg-slate-950 rounded-full border border-slate-100 dark:border-slate-900">
            <ArrowUpRight size={12} className="text-slate-500 dark:text-slate-400" />
          </div>
          Send
        </button>
        <button
          onClick={onReceive}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold rounded-full border border-slate-200/40 dark:border-slate-700/40 transition-colors cursor-pointer"
        >
          <div className="p-1 bg-white dark:bg-slate-950 rounded-full border border-slate-100 dark:border-slate-900">
            <ArrowDownLeft size={12} className="text-slate-500 dark:text-slate-400" />
          </div>
          Receive
        </button>
      </div>

      {/* bank cards section */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          My Cards
        </span>
        
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
          
          {/* Card 1: Blue Card */}
          <div className="w-[180px] h-[110px] shrink-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-3.5 flex flex-col justify-between shadow-md shadow-blue-500/10 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full border border-white/10"></div>
            <div className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full bg-white/5"></div>
            
            <div className="flex items-center justify-between z-10">
              <span className="text-[9px] font-black tracking-widest opacity-85">VISA</span>
              <div className="w-5 h-4 bg-amber-200/70 rounded-sm"></div>
            </div>
            
            <div className="flex flex-col gap-0.5 z-10">
              <span className="text-[11px] font-bold tracking-wider">**** **** **** 4455</span>
              <span className="text-[8px] uppercase font-bold opacity-75">Jack Walson</span>
            </div>
          </div>

          {/* Card 2: Mint/Gray Card */}
          <div className="w-[180px] h-[110px] shrink-0 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-slate-800 dark:to-slate-900 text-teal-900 dark:text-slate-100 border border-emerald-200/10 dark:border-slate-800/80 p-3.5 flex flex-col justify-between shadow-md shadow-teal-500/5 relative overflow-hidden">
            <div className="absolute -right-2 -top-2 w-12 h-12 rounded-full border border-teal-900/5 dark:border-white/5"></div>
            
            <div className="flex items-center justify-between z-10">
              <span className="text-[9px] font-black tracking-widest opacity-85">VISA</span>
              <div className="w-5 h-4 bg-teal-800/10 dark:bg-slate-700/60 rounded-sm"></div>
            </div>
            
            <div className="flex flex-col gap-0.5 z-10">
              <span className="text-[11px] font-bold tracking-wider">**** **** **** 1599</span>
              <span className="text-[8px] uppercase font-bold opacity-75">Jack Walson</span>
            </div>
          </div>

          {/* Card 3: Capsule Plus button */}
          <button 
            className="w-[44px] h-[110px] shrink-0 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
            title="Add new card"
          >
            <Plus size={16} />
          </button>

        </div>
      </div>

    </div>
  );
}
