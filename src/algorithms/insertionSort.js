/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n^2) average/worst, O(n) best
 * Space Complexity: O(1)
 *
 * Builds the sorted array one item at a time by taking each element
 * and inserting it into its correct position among the already-sorted elements.
 */

/**
 * Generates animation steps for Insertion Sort visualization.
 * @param {number[]} array - The input array to sort
 * @returns {{ steps: Array, comparisons: number, swaps: number }}
 */
export function getInsertionSortSteps(array) {
  const arr = [...array];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const sortedIndices = new Set();

  sortedIndices.add(0);

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [j - 1, j],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });

      if (arr[j] < arr[j - 1]) {
        swaps++;
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        steps.push({
          type: 'swap',
          indices: [j, j - 1],
          array: [...arr],
          sortedIndices: [...sortedIndices],
        });
        j--;
      } else {
        break;
      }
    }

    sortedIndices.add(i);
    steps.push({
      type: 'sorted',
      indices: [i],
      array: [...arr],
      sortedIndices: [...sortedIndices],
    });
  }

  steps.push({
    type: 'done',
    indices: [],
    array: [...arr],
    sortedIndices: [...Array.from({ length: n }, (_, i) => i)],
  });

  return { steps, comparisons, swaps };
}

/**
 * Runs Insertion Sort and returns stats only (no animation) for comparison mode.
 * @param {number[]} array
 * @returns {{ time: number, comparisons: number, swaps: number }}
 */
export function runInsertionSort(array) {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        swaps++;
        j--;
      } else {
        break;
      }
    }
  }

  const time = performance.now() - start;
  return { time: parseFloat(time.toFixed(4)), comparisons, swaps };
}
