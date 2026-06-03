import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, LayoutDashboard, Code, Terminal } from 'lucide-react';
import SortingVisualizer from './components/SortingVisualizer';
import ControlPanel from './components/ControlPanel';
import StatisticsPanel from './components/StatisticsPanel';
import ComparisonTable from './components/ComparisonTable';
import PerformanceGraph from './components/PerformanceGraph';
import ComplexityChart from './components/ComplexityChart';
import AlgorithmInfo from './components/AlgorithmInfo';
import { generateRandomArray } from './utils/arrayGenerator';
import { ALGORITHM_COMPLEXITY } from './utils/complexityData';

// Algorithm Runners (sync versions for benchmark)
import { runBubbleSort } from './algorithms/bubbleSort';
import { runSelectionSort } from './algorithms/selectionSort';
import { runInsertionSort } from './algorithms/insertionSort';
import { runMergeSort } from './algorithms/mergeSort';
import { runQuickSort } from './algorithms/quickSort';
import { runHeapSort } from './algorithms/heapSort';

const RUNNERS = {
  'Bubble Sort': runBubbleSort,
  'Selection Sort': runSelectionSort,
  'Insertion Sort': runInsertionSort,
  'Merge Sort': runMergeSort,
  'Quick Sort': runQuickSort,
  'Heap Sort': runHeapSort,
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(6);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [array, setArray] = useState([]);
  
  // App State
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });
  
  // Benchmark Results
  const [compareMode, setCompareMode] = useState(false);
  const [benchmarkResults, setBenchmarkResults] = useState([]);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  // Initialize and apply dark mode class to html element
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // Initial array generation
  useEffect(() => {
    handleGenerateNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  const handleGenerateNew = useCallback(() => {
    if (isRunning) return;
    const newArr = generateRandomArray(arraySize);
    setArray(newArr);
    setStats({ comparisons: 0, swaps: 0, time: 0 });
    setCompareMode(false);
    
    // Dispatch cancel event to abort any ongoing animation
    window.dispatchEvent(new Event('viz-cancel'));
  }, [arraySize, isRunning]);

  const handleStart = () => {
    if (isRunning && !isPaused) return; // Already running
    setCompareMode(false);
    if (isPaused) {
      setIsPaused(false); // Resume
    } else {
      // Start fresh
      setStats({ comparisons: 0, swaps: 0, time: 0 });
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handlePauseResume = () => {
    if (!isRunning) return;
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    window.dispatchEvent(new Event('viz-cancel'));
    // Small delay to ensure event loop clears animation before resetting array
    setTimeout(() => {
      setArray(prev => [...prev]); // Trigger a reference update to reset the visualizer
      setStats({ comparisons: 0, swaps: 0, time: 0 });
    }, 50);
  };

  const handleSortEnd = (finalStats) => {
    setIsRunning(false);
    setIsPaused(false);
    setStats(finalStats);
  };

  const handleRunBenchmark = () => {
    if (isRunning) return;
    
    // Stop ongoing stuff
    window.dispatchEvent(new Event('viz-cancel'));
    setIsRunning(false);
    setIsPaused(false);
    setCompareMode(true);
    setIsBenchmarking(true);
    
    // Run benchmark in a short timeout to allow UI update to show loader
    setTimeout(() => {
      const results = [];
      const testArray = [...array]; // Run all algos on exactly the same dataset
      
      for (const algoName of Object.keys(RUNNERS)) {
        const stats = RUNNERS[algoName](testArray);
        results.push({
          algorithm: algoName,
          arraySize: array.length,
          time: stats.time,
          comparisons: stats.comparisons,
          swaps: stats.swaps,
          complexity: ALGORITHM_COMPLEXITY[algoName].average
        });
      }
      
      setBenchmarkResults(results);
      setIsBenchmarking(false);
    }, 100);
  };

  return (
    <>
      {/* Animated Background Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className={`min-h-screen ${darkMode ? 'text-slate-200' : 'text-slate-800'} p-4 sm:p-6 lg:p-8 transition-colors-300 relative z-10`}>
        <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} shadow-lg shadow-blue-500/30`}>
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                DAA Visualizer Pro
              </h1>
              <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'} flex items-center gap-2`}>
                <Code className="w-4 h-4" /> Design and Analysis of Algorithms
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl transition-all-200 shadow-sm
              ${darkMode ? 'bg-dark-800 hover:bg-dark-700 text-yellow-400 border border-dark-700' 
                         : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Top Controls & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ControlPanel 
              darkMode={darkMode}
              arraySize={arraySize}
              setArraySize={setArraySize}
              speed={speed}
              setSpeed={setSpeed}
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
              isRunning={isRunning}
              isPaused={isPaused}
              onGenerateNew={handleGenerateNew}
              onStart={handleStart}
              onPauseResume={handlePauseResume}
              onReset={handleReset}
              onCompare={handleRunBenchmark}
            />
          </div>
          <div className="lg:col-span-1">
            <StatisticsPanel 
              darkMode={darkMode}
              stats={stats}
              algorithm={algorithm}
            />
          </div>
        </div>

        {/* Main View Area */}
        {compareMode ? (
          <div className="space-y-6 animate-fade-in">
            {isBenchmarking ? (
              <div className={`h-[420px] rounded-2xl flex flex-col items-center justify-center gap-4 ${darkMode ? 'glass border-dark-700' : 'glass-light border-slate-200'}`}>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold animate-pulse">Running Benchmark (n={arraySize})...</p>
              </div>
            ) : (
              <>
                <ComparisonTable darkMode={darkMode} results={benchmarkResults} />
                <PerformanceGraph darkMode={darkMode} results={benchmarkResults} />
                <div className="flex justify-center mt-4">
                  <button onClick={() => setCompareMode(false)} className="btn-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <Terminal className="w-5 h-5" /> Back to Visualizer
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Visualizer Canvas */}
              <SortingVisualizer 
                darkMode={darkMode}
                algorithm={algorithm}
                array={array}
                speed={speed}
                isRunning={isRunning}
                isPaused={isPaused}
                onSortStart={() => {}}
                onSortEnd={handleSortEnd}
                onStatsUpdate={setStats}
              />
              {/* Educational Info */}
              <AlgorithmInfo darkMode={darkMode} algorithm={algorithm} />
            </div>
            
            <div className="lg:col-span-1">
              <ComplexityChart darkMode={darkMode} />
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}
