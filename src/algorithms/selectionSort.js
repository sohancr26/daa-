/**
 * Selection Sort Algorithm
 * Time Complexity: O(n^2) in all cases
 * Space Complexity: O(1)
 *
 * Divides the array into sorted and unsorted halves. Repeatedly
 * finds the minimum element from the unsorted portion and places it at the end of the sorted portion.
 */

/**
 * Generates animation steps for Selection Sort visualization.
 * @param {number[]} array - The input array to sort
 * @returns {{ steps: Array, comparisons: number, swaps: number }}
 */
export function getSelectionSortSteps(array) {
  const arr = [...array];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [minIdx, j],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        type: 'swap',
        indices: [i, minIdx],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });
    }

    sortedIndices.add(i);
    steps.push({
      type: 'sorted',
      indices: [i],
      array: [...arr],
      sortedIndices: [...sortedIndices],
    });
  }

  sortedIndices.add(n - 1);
  steps.push({
    type: 'done',
    indices: [],
    array: [...arr],
    sortedIndices: [...sortedIndices],
  });

  return { steps, comparisons, swaps };
}

/**
 * Runs Selection Sort and returns stats only (no animation) for comparison mode.
 * @param {number[]} array
 * @returns {{ time: number, comparisons: number, swaps: number }}
 */
export function runSelectionSort(array) {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
    }
  }

  const time = performance.now() - start;
  return { time: parseFloat(time.toFixed(4)), comparisons, swaps };
}
