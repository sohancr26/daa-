import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { COMPLEXITY_CHART_DATA } from '../utils/complexityData';

export default function ComplexityChart({ darkMode }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${darkMode ? 'bg-dark-800 border-dark-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <p className="font-bold mb-2">n = {label}</p>
          {payload.map((p, i) => (
            <p key={i} className="text-sm font-mono flex items-center gap-2" style={{ color: p.color }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }} />
              {p.name}: {p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`p-5 rounded-2xl ${darkMode ? 'glass border-dark-700' : 'glass-light border-slate-200'}`}>
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        <TrendingUp className="w-4 h-4" /> Asymptotic Complexity Growth
      </h3>
      <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        Visual representation of O(n), O(n log n), and O(n²) growth as N increases.
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={COMPLEXITY_CHART_DATA} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
            <XAxis dataKey="n" tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} label={{ value: 'Array Size (n)', position: 'insideBottomRight', offset: -10, fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} />
            <YAxis tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
            <Line type="monotone" dataKey="nSquared" name="O(n²) - Bubble/Selection/Insertion" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="nLogN" name="O(n log n) - Merge/Quick/Heap" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="n1" name="O(n) - Best Case (Some)" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
