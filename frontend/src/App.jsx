import React, { useState, useEffect } from 'react';
import api from './services/api';
import MetricCard from './components/MetricCard';
import AnalyticsCharts from './components/AnalyticsCharts';
import CategoryProgress from './components/CategoryProgress';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import { Sun, Moon, TrendingUp, TrendingDown, Wallet, AlertOctagon, PiggyBank, RotateCcw } from 'lucide-react';

export default function App() {
  // Global States
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState({
    category_totals: {},
    category_percentages: {},
    total_income: 0.0,
    total_expense: 0.0,
    net_balance: 0.0,
    top_category: 'None',
    transaction_count: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Toasts Notification State
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Sync Dark Mode state to root element class list
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch initial API data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [txResponse, analyticsResponse] = await Promise.all([
        api.get('/transactions'),
        api.get('/analytics')
      ]);
      setTransactions(txResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (err) {
      console.error("API error during data load:", err);
      setError("Unable to connect to the backend server. Please verify your FastAPI server is running on port 8000 and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update Category in DB
  const handleUpdateCategory = async (id, newCategory) => {
    try {
      const response = await api.put(`/transactions/${id}`, { category: newCategory });
      // Update local transaction state
      setTransactions(prev => prev.map(tx => tx.id === id ? response.data : tx));
      
      // Re-fetch analytics to keep statistics up-to-date
      const analyticsResponse = await api.get('/analytics');
      setAnalytics(analyticsResponse.data);
      
      addToast(`Category updated to "${newCategory}" successfully!`, 'success');
    } catch (err) {
      console.error(err);
      addToast("Failed to update transaction category.", "error");
    }
  };

  // Create new transaction from raw alert string
  const handleAddTransaction = async (rawMessage) => {
    setIsSubmitLoading(true);
    try {
      const response = await api.post('/transactions', { raw_message: rawMessage });
      // Insert parsed transaction at top of list
      setTransactions(prev => [response.data, ...prev]);
      
      // Update analytics
      const analyticsResponse = await api.get('/analytics');
      setAnalytics(analyticsResponse.data);

      addToast("UPI transaction parsed and saved!", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to parse or save transaction message.", "error");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Delete transaction from DB
  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(prev => prev.filter(tx => tx.id !== id));
      
      // Refresh analytics
      const analyticsResponse = await api.get('/analytics');
      setAnalytics(analyticsResponse.data);

      addToast("Transaction deleted successfully.", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to delete transaction.", "error");
    }
  };

  // Client-side filtering logic
  const filteredTransactions = transactions.filter(tx => {
    // Search match (merchant or raw message)
    const matchesSearch = 
      (tx.merchant?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      tx.raw_message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type match
    const matchesType = typeFilter === 'all' || tx.transaction_type === typeFilter;
    
    // Category match
    const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Calculate total savings dynamically from transaction list
  const totalSavings = transactions.reduce((acc, curr) => acc + (curr.reward_amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-xl shadow-lg border text-sm font-bold flex items-center gap-2 pointer-events-auto animate-in slide-in-from-top-5 duration-200 ${
              t.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300'
            }`}
          >
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              UPI Transactions Dashboard
            </h1>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
              Automated UPI SMS Parser, Spend Categorizer & Cashback Tracker
            </p>
          </div>

          {/* Theme Control toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Toggle theme mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Loading / Error States */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md mx-auto text-center shadow-md flex flex-col items-center gap-4 mt-12">
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/30">
              <AlertOctagon size={36} />
            </div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-200">
              Connection Failure
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {error}
            </p>
            <button
              onClick={fetchData}
              className="flex items-center justify-center gap-2 mt-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl cursor-pointer shadow-sm transition-all"
            >
              <RotateCcw size={16} />
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Top Summaries Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="Total Credits / Income"
                value={analytics.total_income}
                type="income"
                icon={TrendingUp}
              />
              <MetricCard
                title="Total Expenses / Debit"
                value={analytics.total_expense}
                type="expense"
                icon={TrendingDown}
              />
              <MetricCard
                title="Net Balance"
                value={analytics.net_balance}
                type="balance"
                icon={Wallet}
              />
            </div>

            {/* Savings projection notification card */}
            {totalSavings > 0 && (
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-sm flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-xl shrink-0">
                  <PiggyBank size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                    Projected Cashback Savings
                  </span>
                  <span className="text-lg font-black">
                    ₹{totalSavings.toFixed(2)} Accumulating
                  </span>
                </div>
                <div className="ml-auto text-xs font-semibold bg-white/20 px-3 py-1 rounded-full border border-white/20">
                  5% Partner Yield
                </div>
              </div>
            )}

            {/* Core Body Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Side: Graphs, Breakdown, and SMS Simulation Form */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                
                {/* Recharts chart */}
                <AnalyticsCharts categoryTotals={analytics.category_totals} />

                {/* Animated progress blocks */}
                <CategoryProgress
                  categoryTotals={analytics.category_totals}
                  categoryPercentages={analytics.category_percentages}
                />

                {/* Simulated sms alert parse panel */}
                <AddTransactionModal
                  onAddTransaction={handleAddTransaction}
                  isLoading={isSubmitLoading}
                />
              </div>

              {/* Right Side: Timeline scrolling ledger */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-800 dark:text-slate-200">
                    Transaction Timeline
                  </h2>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 px-2.5 py-1 rounded-full">
                    {filteredTransactions.length} of {transactions.length} items
                  </span>
                </div>

                <TransactionList
                  transactions={filteredTransactions}
                  onUpdateCategory={handleUpdateCategory}
                  onDeleteTransaction={handleDeleteTransaction}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  typeFilter={typeFilter}
                  setTypeFilter={setTypeFilter}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                />
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
