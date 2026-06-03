import React from 'react';
import { Play, Pause, RotateCcw, Shuffle, Zap, Settings, GitCompare } from 'lucide-react';
import { ALGORITHM_LIST } from '../utils/complexityData';

export default function ControlPanel({
  darkMode,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  isRunning,
  isPaused,
  onGenerateNew,
  onStart,
  onPauseResume,
  onReset,
  onCompare
}) {
  return (
    <div className={`p-5 rounded-2xl ${darkMode ? 'glass border-dark-700' : 'glass-light border-slate-200'} transition-all-200`}>
      <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        <Settings className="inline-block w-4 h-4 mr-2 mb-0.5" /> Controls
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sliders */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Array Size</label>
              <span className={`text-xs font-mono font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{arraySize}</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isRunning}
              className={`w-full ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Speed</label>
              <span className={`text-xs font-mono font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{speed}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="flex flex-col justify-center">
          <label className={`text-xs font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Algorithm</label>
          <div className="relative">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isRunning}
              className={`w-full appearance-none p-3 rounded-xl outline-none font-semibold text-sm transition-colors-300 shadow-sm
                ${darkMode 
                  ? 'bg-dark-800 border-dark-600 text-white focus:border-blue-500' 
                  : 'bg-white border-slate-300 text-slate-800 focus:border-blue-500'} 
                border-2 ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {ALGORITHM_LIST.map(algo => (
                <option key={algo} value={algo}>{algo}</option>
              ))}
            </select>
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-full">
            <button
              onClick={onGenerateNew}
              disabled={isRunning}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all-200 shadow-sm
                ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                ${darkMode ? 'bg-dark-700 hover:bg-dark-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
            >
              <Shuffle className="w-5 h-5 mb-1" />
              New Array
            </button>
            
            <button
              onClick={isRunning ? onPauseResume : onStart}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all-200 text-white shadow-sm hover:scale-105 active:scale-95
                ${isRunning && !isPaused ? 'btn-danger' : 'btn-success'}`}
            >
              {isRunning && !isPaused ? <Pause className="w-5 h-5 mb-1" /> : <Play className="w-5 h-5 mb-1 ml-0.5" />}
              {isRunning ? (isPaused ? 'Resume' : 'Pause') : 'Start'}
            </button>

            <button
              onClick={onReset}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all-200 shadow-sm hover:scale-105 active:scale-95 text-white btn-primary`}
            >
              <RotateCcw className="w-5 h-5 mb-1" />
              Reset
            </button>

            <button
              onClick={onCompare}
              disabled={isRunning}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all-200 shadow-sm
                ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                ${darkMode ? 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/60 border border-purple-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200'}`}
            >
              <GitCompare className="w-5 h-5 mb-1" />
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
