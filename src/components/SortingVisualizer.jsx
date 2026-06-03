import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play, Pause, RotateCcw, Shuffle, Zap, GitCompare,
  Sun, Moon, Volume2, VolumeX, ChevronDown, Trophy, Download
} from 'lucide-react';
import { generateRandomArray } from '../utils/arrayGenerator';
import { speedToDelay, getBarStateColor, formatTime } from '../utils/animationHelper';
import { ALGORITHM_COMPLEXITY } from '../utils/complexityData';
import { getBubbleSortSteps } from '../algorithms/bubbleSort';
import { getSelectionSortSteps } from '../algorithms/selectionSort';
import { getInsertionSortSteps } from '../algorithms/insertionSort';
import { getMergeSortSteps } from '../algorithms/mergeSort';
import { getQuickSortSteps } from '../algorithms/quickSort';
import { getHeapSortSteps } from '../algorithms/heapSort';

const ALGORITHM_STEP_GENERATORS = {
  'Bubble Sort': getBubbleSortSteps,
  'Selection Sort': getSelectionSortSteps,
  'Insertion Sort': getInsertionSortSteps,
  'Merge Sort': getMergeSortSteps,
  'Quick Sort': getQuickSortSteps,
  'Heap Sort': getHeapSortSteps,
};

/**
 * SortingVisualizer — Core visualization component.
 * Renders the animated bar chart and orchestrates step playback.
 */
export default function SortingVisualizer({
  darkMode, algorithm, array, speed, isRunning, isPaused,
  onSortStart, onSortEnd, onStatsUpdate, onStateChange,
}) {
  const [displayArray, setDisplayArray] = useState([...array]);
  const [currentStep, setCurrentStep] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const stepsRef = useRef([]);
  const stepIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const cancelRef = useRef(false);
  const startTimeRef = useRef(null);

  // Sync display array when parent array changes (new array generated)
  useEffect(() => {
    setDisplayArray([...array]);
    setCurrentStep(null);
    setIsDone(false);
    stepsRef.current = [];
    stepIndexRef.current = 0;
  }, [array]);

  // Pause / Resume via ref so animation loop reads latest value
  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  // Start animation when isRunning flips true
  useEffect(() => {
    if (!isRunning) return;
    cancelRef.current = false;
    setIsDone(false);
    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  async function runAnimation() {
    const generator = ALGORITHM_STEP_GENERATORS[algorithm];
    if (!generator) return;

    const { steps, comparisons, swaps } = generator(array);
    stepsRef.current = steps;
    startTimeRef.current = performance.now();

    for (let i = 0; i < steps.length; i++) {
      if (cancelRef.current) return;

      // Pause loop
      while (pausedRef.current) {
        if (cancelRef.current) return;
        await new Promise(r => setTimeout(r, 50));
      }

      const step = steps[i];
      stepIndexRef.current = i;
      setCurrentStep(step);
      setStepIndex(i);
      setDisplayArray([...step.array]);

      // Update live stats
      const elapsed = performance.now() - startTimeRef.current;
      const stepComparisons = steps.slice(0, i + 1).filter(s => s.type === 'compare').length;
      const stepSwaps = steps.slice(0, i + 1).filter(s => s.type === 'swap').length;
      onStatsUpdate({ comparisons: stepComparisons, swaps: stepSwaps, time: elapsed });

      if (step.type !== 'done') {
        await new Promise(r => setTimeout(r, speedToDelay(speed)));
      }
    }

    if (!cancelRef.current) {
      const totalTime = performance.now() - startTimeRef.current;
      setIsDone(true);
      onStatsUpdate({ comparisons, swaps, time: totalTime });
      onSortEnd({ comparisons, swaps, time: totalTime });
    }
  }

  // Cancel animation (reset)
  const cancel = useCallback(() => {
    cancelRef.current = true;
  }, []);

  // Expose cancel to parent via ref pattern — we use a custom event instead
  useEffect(() => {
    const handler = () => cancel();
    window.addEventListener('viz-cancel', handler);
    return () => window.removeEventListener('viz-cancel', handler);
  }, [cancel]);

  const maxVal = Math.max(...displayArray, 1);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden transition-colors-300 ${
      darkMode
        ? 'bg-dark-800/60 border border-dark-700'
        : 'bg-white/60 border border-slate-200'
    }`} style={{ height: 420 }}>
      {/* Legend */}
      <div className="absolute top-3 left-3 flex gap-3 z-10 flex-wrap">
        {[
          { color: '#6b7280', label: 'Default' },
          { color: '#3b82f6', label: 'Comparing' },
          { color: '#ef4444', label: 'Swapping' },
          { color: '#10b981', label: 'Sorted' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Progress */}
      {isRunning && stepsRef.current.length > 0 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-700 z-20">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
            style={{ width: `${(stepIndex / Math.max(stepsRef.current.length - 1, 1)) * 100}%` }}
          />
        </div>
      )}

      {/* Bars */}
      <div className="bar-container" style={{ height: '100%', paddingTop: 40, paddingBottom: 4 }}>
        {displayArray.map((val, i) => {
          const heightPct = (val / maxVal) * 100;
          let color = '#6b7280';
          if (isDone) {
            color = '#10b981';
          } else if (currentStep) {
            color = getBarStateColor(i, currentStep, isDone);
          }

          return (
            <div
              key={i}
              className="bar"
              style={{
                height: `${heightPct}%`,
                background: color === '#6b7280' 
                  ? (darkMode ? 'linear-gradient(to top, #334155, #64748b)' : 'linear-gradient(to top, #cbd5e1, #94a3b8)')
                  : color === '#10b981'
                  ? 'linear-gradient(to top, #059669, #34d399)'
                  : color === '#ef4444'
                  ? 'linear-gradient(to top, #dc2626, #f87171)'
                  : 'linear-gradient(to top, #2563eb, #60a5fa)',
                boxShadow: color !== '#6b7280' ? `0 0 12px ${color}aa` : 'none',
                borderRadius: '6px 6px 0 0',
                margin: '0 1px'
              }}
            >
              <span className="bar-tooltip">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Done overlay */}
      {isDone && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="glass rounded-2xl px-6 py-3 flex items-center gap-2 animate-scale-in">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Sorted!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
