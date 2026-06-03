import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { ALGORITHM_COMPLEXITY } from '../utils/complexityData';

export default function PerformanceGraph({ darkMode, results }) {
  if (!results || results.length === 0) return null;

  const data = results.map(r => ({
    name: r.algorithm,
    Time: Number(r.time.toFixed(2)),
    Comparisons: r.comparisons,
    Swaps: r.swaps,
    color: ALGORITHM_COMPLEXITY[r.algorithm]?.color || '#8884d8'
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${darkMode ? 'bg-dark-800 border-dark-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <p className="font-bold mb-1">{label}</p>
          {payload.map((p, i) => (
            <p key={i} className="text-sm font-mono" style={{ color: p.color }}>
              {p.name}: {p.value} {p.name === 'Time' ? 'ms' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-5 rounded-2xl ${darkMode ? 'glass border-dark-700' : 'glass-light border-slate-200'}`}>
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        <BarChart2 className="w-4 h-4" /> Performance Metrics Graph
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time Graph */}
        <div className="h-64">
          <h4 className={`text-xs text-center font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Execution Time (ms)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} angle={-25} textAnchor="end" />
              <YAxis tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Time" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Operations Graph (Comparisons & Swaps) */}
        <div className="h-64">
          <h4 className={`text-xs text-center font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Comparisons & Swaps</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} angle={-25} textAnchor="end" />
              <YAxis tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
              <Bar dataKey="Comparisons" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Swaps" fill="#ef4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
