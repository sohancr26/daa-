/**
 * Complexity Data for all algorithms
 * Used by the ComplexityChart and AlgorithmInfo components.
 */

export const ALGORITHM_COMPLEXITY = {
  'Bubble Sort': {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    bestVal: 1,
    averageVal: 4,
    worstVal: 4,
    description:
      'Bubble Sort repeatedly compares adjacent pairs and swaps them if out of order. Each pass bubbles the largest unsorted element to its correct position.',
    advantages: [
      'Simple to understand and implement',
      'Stable sort algorithm',
      'In-place sorting (no extra memory)',
      'Detects already-sorted arrays in O(n)',
    ],
    disadvantages: [
      'O(n²) average and worst-case time complexity',
      'Very slow on large datasets',
      'Not suitable for production use with large arrays',
    ],
    useCases: 'Educational purposes and nearly-sorted small arrays.',
    color: '#f59e0b',
  },
  'Selection Sort': {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    bestVal: 4,
    averageVal: 4,
    worstVal: 4,
    description:
      'Selection Sort divides the array into sorted and unsorted parts. It repeatedly finds the minimum element in the unsorted part and places it at the beginning of the sorted part.',
    advantages: [
      'Simple to implement',
      'In-place sorting',
      'Minimum number of swaps (O(n) swaps)',
      'Good for small datasets',
    ],
    disadvantages: [
      'O(n²) in all cases — no early termination',
      'Not stable (can change relative order of equal elements)',
      'Poor cache performance',
    ],
    useCases: 'When memory writes are expensive (e.g., flash memory).',
    color: '#8b5cf6',
  },
  'Insertion Sort': {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    bestVal: 1,
    averageVal: 4,
    worstVal: 4,
    description:
      'Insertion Sort builds a sorted array one element at a time. It picks each element and inserts it into its correct position among the already-sorted elements.',
    advantages: [
      'Very efficient for small or nearly-sorted arrays',
      'Stable sort algorithm',
      'In-place — O(1) extra space',
      'Online algorithm — can sort as data arrives',
    ],
    disadvantages: [
      'O(n²) average and worst-case complexity',
      'Slow on large, randomly ordered arrays',
    ],
    useCases: 'Small datasets, nearly-sorted data, or as part of Timsort.',
    color: '#ec4899',
  },
  'Merge Sort': {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    bestVal: 2,
    averageVal: 2,
    worstVal: 2,
    description:
      'Merge Sort uses Divide and Conquer. It recursively splits the array in half, sorts each half, then merges the sorted halves. Guaranteed O(n log n) performance.',
    advantages: [
      'Guaranteed O(n log n) in all cases',
      'Stable sort algorithm',
      'Works well for linked lists',
      'Predictable performance',
    ],
    disadvantages: [
      'Requires O(n) extra space',
      'Slower than Quick Sort in practice on average',
      'Not in-place',
    ],
    useCases: 'Large datasets, external sorting, linked lists.',
    color: '#06b6d4',
  },
  'Quick Sort': {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    bestVal: 2,
    averageVal: 2,
    worstVal: 4,
    description:
      'Quick Sort is a Divide and Conquer algorithm. It picks a pivot element, partitions the array so elements < pivot are on the left, and elements > pivot on the right, then recursively sorts each side.',
    advantages: [
      'Fastest average-case sorting algorithm in practice',
      'In-place (low memory usage)',
      'Cache-friendly',
      'Easy to implement iteratively',
    ],
    disadvantages: [
      'Worst case O(n²) with bad pivot choices',
      'Not stable',
      'Recursive — stack overflow risk for very large arrays',
    ],
    useCases: 'General-purpose sorting — the most widely used in practice.',
    color: '#f97316',
  },
  'Heap Sort': {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    bestVal: 2,
    averageVal: 2,
    worstVal: 2,
    description:
      'Heap Sort uses a Max-Heap data structure. It first builds a max-heap from the array, then repeatedly extracts the maximum element and rebuilds the heap until the array is sorted.',
    advantages: [
      'Guaranteed O(n log n) in all cases',
      'In-place — O(1) extra space',
      'No worst-case quadratic behavior like Quick Sort',
    ],
    disadvantages: [
      'Not stable',
      'Poor cache performance due to non-sequential memory access',
      'Slower in practice than Quick Sort and Merge Sort',
    ],
    useCases: 'Systems where guaranteed O(n log n) and in-place are both required.',
    color: '#10b981',
  },
};

export const ALGORITHM_LIST = Object.keys(ALGORITHM_COMPLEXITY);

/** Numerical complexity labels for the complexity chart */
export const COMPLEXITY_CHART_DATA = [
  { n: 10, nSquared: 100, nLogN: Math.round(10 * Math.log2(10)), n1: 10 },
  { n: 20, nSquared: 400, nLogN: Math.round(20 * Math.log2(20)), n1: 20 },
  { n: 50, nSquared: 2500, nLogN: Math.round(50 * Math.log2(50)), n1: 50 },
  { n: 100, nSquared: 10000, nLogN: Math.round(100 * Math.log2(100)), n1: 100 },
  { n: 200, nSquared: 40000, nLogN: Math.round(200 * Math.log2(200)), n1: 200 },
  { n: 500, nSquared: 250000, nLogN: Math.round(500 * Math.log2(500)), n1: 500 },
];
