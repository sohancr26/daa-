import React from 'react';
import { Activity, Clock, RefreshCcw, Hash, Database, Zap } from 'lucide-react';
import { ALGORITHM_COMPLEXITY } from '../utils/complexityData';
import { formatTime } from '../utils/animationHelper';

export default function StatisticsPanel({ darkMode, stats, algorithm }) {
  const complexity = ALGORITHM_COMPLEXITY[algorithm];

  const statBoxes = [
    { label: 'Comparisons', value: stats.comparisons, icon: <Activity className="w-4 h-4" />, color: 'blue' },
    { label: 'Swaps', value: stats.swaps, icon: <RefreshCcw className="w-4 h-4" />, color: 'red' },
    { label: 'Time', value: formatTime(stats.time), icon: <Clock className="w-4 h-4" />, color: 'purple' },
    { label: 'Time Complexity', value: complexity.average, icon: <Zap className="w-4 h-4" />, color: 'amber' },
    { label: 'Space Complexity', value: complexity.space, icon: <Database className="w-4 h-4" />, color: 'emerald' },
  ];

  return (
    <div className={`p-5 rounded-2xl ${darkMode ? 'glass border-dark-700' : 'glass-light border-slate-200'} transition-all-200 h-full`}>
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        <Activity className="w-4 h-4" /> Live Statistics
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {statBoxes.map((stat, i) => (
          <div key={i} className={`p-3 rounded-xl flex flex-col justify-between
            ${darkMode ? 'bg-dark-800/80 border border-dark-600' : 'bg-white border border-slate-100 shadow-sm'}`}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className={`text-${stat.color}-500 ${darkMode ? `text-${stat.color}-400` : ''}`}>{stat.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {stat.label}
              </span>
            </div>
            <div className={`font-mono text-lg sm:text-xl font-bold truncate
              ${typeof stat.value === 'string' && stat.value.includes('O(') 
                ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') 
                : (darkMode ? 'text-white' : 'text-slate-800')}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
