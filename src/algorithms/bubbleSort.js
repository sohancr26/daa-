/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n^2) average and worst, O(n) best
 * Space Complexity: O(1)
 *
 * Repeatedly steps through the list, compares adjacent elements,
 * and swaps them if they are in the wrong order.
 */

/**
 * Generates animation steps for Bubble Sort visualization.
 * @param {number[]} array - The input array to sort
 * @returns {{ steps: Array, comparisons: number, swaps: number }}
 */
export function getBubbleSortSteps(array) {
  const arr = [...array];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      // Mark these two as being compared
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          sortedIndices: [...sortedIndices],
        });
      }
    }
    // Mark the last element of this pass as sorted
    sortedIndices.add(n - i - 1);
    steps.push({
      type: 'sorted',
      indices: [n - i - 1],
      array: [...arr],
      sortedIndices: [...sortedIndices],
    });
    if (!swapped) break; // Early termination if already sorted
  }
  // Mark all remaining as sorted
  for (let k = 0; k < n; k++) sortedIndices.add(k);
  steps.push({
    type: 'done',
    indices: [],
    array: [...arr],
    sortedIndices: [...sortedIndices],
  });

  return { steps, comparisons, swaps };
}

/**
 * Runs Bubble Sort and returns stats only (no animation) for comparison mode.
 * @param {number[]} array
 * @returns {{ time: number, comparisons: number, swaps: number }}
 */
export function runBubbleSort(array) {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swapped = true;
      }
    }
    if (!swapped) break;
  }

  const time = performance.now() - start;
  return { time: parseFloat(time.toFixed(4)), comparisons, swaps };
}
