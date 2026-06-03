import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';
import { ALGORITHM_COMPLEXITY } from '../utils/complexityData';

export default function AlgorithmInfo({ darkMode, algorithm }) {
  const [isOpen, setIsOpen] = useState(true);
  const info = ALGORITHM_COMPLEXITY[algorithm];

  if (!info) return null;

  return (
    <div className={`rounded-2xl overflow-hidden transition-all-200 ${
      darkMode ? 'bg-dark-800/80 border border-dark-700' : 'bg-white border border-slate-200'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 flex items-center justify-between font-bold
          ${darkMode ? 'hover:bg-dark-700' : 'hover:bg-slate-50'}`}
      >
        <div className="flex items-center gap-2">
          <BookOpen className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={darkMode ? 'text-white' : 'text-slate-800'}>{algorithm} Explanation</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      <div className={`accordion-content ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`p-5 border-t ${darkMode ? 'border-dark-700' : 'border-slate-100'}`}>
          
          <div className="mb-6">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Working Principle</h4>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {info.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                <CheckCircle className="w-4 h-4" /> Advantages
              </h4>
              <ul className="space-y-2">
                {info.advantages.map((adv, i) => (
                  <li key={i} className={`text-sm flex items-start gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                <XCircle className="w-4 h-4" /> Disadvantages
              </h4>
              <ul className="space-y-2">
                {info.disadvantages.map((dis, i) => (
                  <li key={i} className={`text-sm flex items-start gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {dis}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`p-4 rounded-xl ${darkMode ? 'bg-dark-900/50' : 'bg-slate-50'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Common Use Cases</h4>
            <p className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              {info.useCases}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
