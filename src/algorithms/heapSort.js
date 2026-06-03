/**
 * Heap Sort Algorithm
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(1)
 *
 * Uses a max-heap data structure. First builds a max-heap from the array,
 * then repeatedly extracts the maximum element and places it at the end.
 */

/**
 * Generates animation steps for Heap Sort visualization.
 * @param {number[]} array - The input array to sort
 * @returns {{ steps: Array, comparisons: number, swaps: number }}
 */
export function getHeapSortSteps(array) {
  const arr = [...array];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const sortedIndices = new Set();

  function heapify(arr, n, i, heapSize) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < heapSize) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [largest, left],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < heapSize) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [largest, right],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      swaps++;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        type: 'swap',
        indices: [i, largest],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });
      heapify(arr, n, largest, heapSize);
    }
  }

  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, n);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    swaps++;
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({
      type: 'swap',
      indices: [0, i],
      array: [...arr],
      sortedIndices: [...sortedIndices],
    });

    sortedIndices.add(i);
    steps.push({
      type: 'sorted',
      indices: [i],
      array: [...arr],
      sortedIndices: [...sortedIndices],
    });

    heapify(arr, n, 0, i);
  }

  sortedIndices.add(0);
  const allSorted = Array.from({ length: n }, (_, i) => i);
  steps.push({ type: 'done', indices: [], array: [...arr], sortedIndices: allSorted });

  return { steps, comparisons, swaps };
}

/**
 * Runs Heap Sort and returns stats only (no animation) for comparison mode.
 * @param {number[]} array
 * @returns {{ time: number, comparisons: number, swaps: number }}
 */
export function runHeapSort(array) {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  function heapify(arr, n, i, size) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < size) { comparisons++; if (arr[l] > arr[largest]) largest = l; }
    if (r < size) { comparisons++; if (arr[r] > arr[largest]) largest = r; }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;
      heapify(arr, n, largest, size);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i, n);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    heapify(arr, n, 0, i);
  }

  const time = performance.now() - start;
  return { time: parseFloat(time.toFixed(4)), comparisons, swaps };
}
