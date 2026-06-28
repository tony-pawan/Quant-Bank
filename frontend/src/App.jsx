import React, { useState, useEffect } from 'react';
import api from './services/api';
import Navbar from './components/Navbar';
import BalanceCard from './components/BalanceCard';
import SpendingCard from './components/SpendingCard';
import InsightsCard from './components/InsightsCard';
import ExpenseAnalytics from './components/ExpenseAnalytics';
import CategoryProgress from './components/CategoryProgress';
import CategoryManager from './components/CategoryManager';
import ExpectedSavingsCard from './components/ExpectedSavingsCard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  // Database States
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
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
  
  // Theme and active UI Tab
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Filter, Search, and Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Load transactions, metrics, and categories
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [txResponse, analyticsResponse, categoriesResponse] = await Promise.all([
        api.get('/transactions'),
        api.get('/analytics'),
        api.get('/categories')
      ]);
      setTransactions(txResponse.data);
      setAnalytics(analyticsResponse.data);
      setCategories(categoriesResponse.data.map(c => c.name));
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the QuantBank server. Please make sure the FastAPI server is running on port 8000.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update transaction category
  const handleUpdateCategory = async (id, newCategory) => {
    try {
      const response = await api.put(`/transactions/${id}`, { category: newCategory });
      setTransactions(prev => prev.map(tx => tx.id === id ? response.data : tx));
      
      const analyticsResponse = await api.get('/analytics');
      setAnalytics(analyticsResponse.data);
      
      toast.success(`Category reassigned to "${newCategory}"`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
    }
  };

  // Add a new custom category
  const handleAddCategory = async (catName) => {
    try {
      const response = await api.post('/categories', { name: catName });
      setCategories(prev => [...prev, response.data.name].sort());
      
      // Update analytics structure to capture the new category
      const analyticsResponse = await api.get('/analytics');
      setAnalytics(analyticsResponse.data);
      
      toast.success(`Category "${response.data.name}" added successfully!`);
    } catch (err) {
      console.error(err);
      const detail = err.response?.data?.detail || "Failed to create category.";
      toast.error(detail);
    }
  };

  // Parse and save transaction from raw alert string
  const handleAddTransaction = async (rawMessage) => {
    setIsSubmitLoading(true);
    try {
      const response = await api.post('/transactions', { raw_message: rawMessage });
      setTransactions(prev => [response.data, ...prev]);
      
      const analyticsResponse = await api.get('/analytics');
      setAnalytics(analyticsResponse.data);

      toast.success("UPI transaction alert parsed and saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to parse transaction alert");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Delete transaction record
  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(prev => prev.filter(tx => tx.id !== id));
      
      const analyticsResponse = await api.get('/analytics');
      setAnalytics(analyticsResponse.data);

      toast.success("Transaction deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete transaction");
    }
  };

  // Filter transactions on client-side
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      (tx.merchant?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      tx.raw_message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || tx.transaction_type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort transactions based on user selection
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortOrder === 'oldest') {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortOrder === 'highest') {
      return b.amount - a.amount;
    } else if (sortOrder === 'lowest') {
      return a.amount - b.amount;
    }
    return 0;
  });

  const totalSavings = transactions.reduce((acc, curr) => acc + (curr.reward_amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900 py-8 px-4 flex items-center justify-center transition-colors duration-200">
      
      {/* Toast notifications container */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { 
            borderRadius: '16px', 
            background: '#1e293b', 
            color: '#f8fafc', 
            fontSize: '11px',
            fontWeight: 'bold',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          } 
        }} 
      />

      {/* Glassmorphic Rounded Centered Container */}
      <div className="w-full max-w-[1400px] bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-[32px] shadow-2xl p-6 flex flex-col gap-6">
        
        {/* Top Navbar Header */}
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md mx-auto text-center shadow-md flex flex-col items-center gap-4 my-16">
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/30">
              <AlertOctagon size={36} />
            </div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-200">
              QuantBank Sync Error
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              {error}
            </p>
            <button
              onClick={fetchData}
              className="flex items-center justify-center gap-2 mt-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs rounded-full cursor-pointer shadow-sm transition-all"
            >
              <RotateCcw size={14} />
              Retry Connection
            </button>
          </div>
        ) : (
          /* Main 3-Column Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left & Center Spanning Area */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Row 1: Balance Card & Spending visual blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Hero Balance and My Cards Visuals */}
                <BalanceCard balance={analytics.net_balance} />
                
                {/* Monthly Spending bar chart and Insights tips stacked */}
                <div className="flex flex-col gap-6">
                  <SpendingCard />
                  <InsightsCard categoryPercentages={analytics.category_percentages} />
                </div>

              </div>

              {/* Row 2: Expenses Daily Area trend line chart */}
              <ExpenseAnalytics />

              {/* Row 3: Category Allocation Cards & Alert Simulator Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryProgress 
                  categoryTotals={analytics.category_totals} 
                  categoryPercentages={analytics.category_percentages} 
                />
                
                <div className="flex flex-col gap-6">
                  <CategoryManager 
                    categories={categories} 
                    onAddCategory={handleAddCategory}
                  />
                  <AddTransactionModal 
                    onAddTransaction={handleAddTransaction}
                    isLoading={isSubmitLoading}
                  />
                </div>
              </div>

            </div>

            {/* Right Side Column (Timeline scroll feed & Radial savings gauge) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              
              {/* Radial Savings Gauge */}
              <ExpectedSavingsCard savingsTotal={totalSavings} />

              {/* Scrolling Timeline Feed */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Latest Transactions
                  </span>
                  <button className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-slate-650">
                    See All
                  </button>
                </div>

                <TransactionList 
                  transactions={sortedTransactions}
                  onUpdateCategory={handleUpdateCategory}
                  onDeleteTransaction={handleDeleteTransaction}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  typeFilter={typeFilter}
                  setTypeFilter={setTypeFilter}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  categories={categories}
                />
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
