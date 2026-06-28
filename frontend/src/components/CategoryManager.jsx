import React, { useState } from 'react';
import { Tag, Plus } from 'lucide-react';

export default function CategoryManager({ categories = [], onAddCategory }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCategory(name);
    setName('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
      
      {/* Header */}
      <div className="flex items-center gap-2">
        <Tag size={16} className="text-blue-500" />
        <h3 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          Category Manager
        </h3>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add custom category (e.g. Shopping)..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          required
        />
        <button
          type="submit"
          className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-sm transition-colors cursor-pointer shrink-0"
          title="Create category"
        >
          <Plus size={14} />
        </button>
      </form>

      {/* Categories List */}
      <div className="mt-1">
        <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
          Available Categories
        </span>
        <div className="flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto pr-1">
          {categories.map(cat => (
            <span
              key={cat}
              className="text-[10px] font-extrabold bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800/65 text-slate-600 dark:text-slate-455 px-2.5 py-1 rounded-lg"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
