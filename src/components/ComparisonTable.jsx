import React from 'react';
import { Trophy, Download, Table as TableIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatTime } from '../utils/animationHelper';

export default function ComparisonTable({ darkMode, results }) {
  if (!results || results.length === 0) return null;

  // Find best performers
  const fastest = [...results].sort((a, b) => a.time - b.time)[0].algorithm;
  const leastComparisons = [...results].sort((a, b) => a.comparisons - b.comparisons)[0].algorithm;
  const leastSwaps = [...results].sort((a, b) => a.swaps - b.swaps)[0].algorithm;

  const handleExportCSV = () => {
    const headers = ['Algorithm', 'Time (ms)', 'Comparisons', 'Swaps', 'Time Complexity'];
    const csvContent = [
      headers.join(','),
      ...results.map(r => `"${r.algorithm}",${r.time},${r.comparisons},${r.swaps},"${r.complexity}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sorting_comparison.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Sorting Algorithms Comparison Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Array Size: ${results[0].arraySize} elements`, 14, 22);
    
    const tableColumn = ["Algorithm", "Time (ms)", "Comparisons", "Swaps", "Time Complexity"];
    const tableRows = results.map(r => [
      r.algorithm, 
      r.time.toFixed(4), 
      r.comparisons, 
      r.swaps, 
      r.complexity
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }
    });

    doc.save("sorting_comparison.pdf");
  };

  return (
    <div className={`p-5 rounded-2xl ${darkMode ? 'glass border-dark-700' : 'glass-light border-slate-200'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <TableIcon className="w-4 h-4" /> Benchmark Results
        </h3>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="badge bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-colors">
            CSV
          </button>
          <button onClick={handleExportPDF} className="badge bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800 transition-colors">
            PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-dark-700">
        <table className={`w-full text-left compare-table ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          <thead className={`uppercase ${darkMode ? 'bg-dark-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
            <tr>
              <th className="p-3">Algorithm</th>
              <th className="p-3">Execution Time</th>
              <th className="p-3">Comparisons</th>
              <th className="p-3">Swaps</th>
              <th className="p-3">Complexity (Avg)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-dark-700">
            {results.map((res, i) => (
              <tr key={res.algorithm} className={`hover:${darkMode ? 'bg-dark-800/50' : 'bg-slate-50'} transition-colors`}>
                <td className="p-3 font-semibold font-sans">{res.algorithm}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1.5 ${res.algorithm === fastest ? (darkMode ? 'text-green-400' : 'text-green-600') : ''}`}>
                    {res.algorithm === fastest && <Trophy className="w-3 h-3" />}
                    {formatTime(res.time)}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1.5 ${res.algorithm === leastComparisons ? (darkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}>
                    {res.algorithm === leastComparisons && <Trophy className="w-3 h-3" />}
                    {res.comparisons.toLocaleString()}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1.5 ${res.algorithm === leastSwaps ? (darkMode ? 'text-purple-400' : 'text-purple-600') : ''}`}>
                    {res.algorithm === leastSwaps && <Trophy className="w-3 h-3" />}
                    {res.swaps.toLocaleString()}
                  </span>
                </td>
                <td className="p-3">{res.complexity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
