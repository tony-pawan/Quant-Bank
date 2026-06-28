import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  darkMode, 
  setDarkMode, 
  activeTab, 
  setActiveTab 
}) {
  const tabs = ["Dashboard", "Transactions", "Analytics", "Expenses", "Spending"];

  return (
    <nav className="w-full flex items-center justify-between py-4 border-b border-slate-200/60 dark:border-slate-800/60 px-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 transition-colors duration-200">
      
      {/* Left: App Logo & Name */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/20">
          Q
        </div>
        <span className="font-black text-lg tracking-tight text-slate-800 dark:text-slate-100">
          QuantBank
        </span>
      </div>

      {/* Center: Navigation Tabs */}
      <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === tab 
                ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right: Search, Actions, Profile */}
      <div className="flex items-center gap-3">
        {/* Rounded Pill Search Bar */}
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 pl-8 pr-4 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:w-56 transition-all duration-200"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Toggle light/dark mode"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Icon with Badge */}
        <button 
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
        </button>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-sm bg-slate-100 dark:bg-slate-800">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="User avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
