/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n^2) worst
 * Space Complexity: O(log n) average
 *
 * Divide and Conquer: picks a pivot element and partitions the array
 * such that elements less than pivot are on the left, greater on the right.
 * Recursively sorts the sub-arrays.
 */

/**
 * Generates animation steps for Quick Sort visualization.
 * @param {number[]} array - The input array to sort
 * @returns {{ steps: Array, comparisons: number, swaps: number }}
 */
export function getQuickSortSteps(array) {
  const arr = [...array];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = new Set();

  function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [j, high], // high is pivot
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          swaps++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            type: 'swap',
            indices: [i, j],
            array: [...arr],
            sortedIndices: [...sortedIndices],
          });
        }
      }
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      swaps++;
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      steps.push({
        type: 'swap',
        indices: [i + 1, high],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });
    }

    sortedIndices.add(i + 1);
    steps.push({
      type: 'sorted',
      indices: [i + 1],
      array: [...arr],
      sortedIndices: [...sortedIndices],
    });

    return i + 1;
  }

  function quickSort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
      steps.push({
        type: 'sorted',
        indices: [low],
        array: [...arr],
        sortedIndices: [...sortedIndices],
      });
    }
  }

  quickSort(arr, 0, arr.length - 1);

  const allSorted = Array.from({ length: arr.length }, (_, i) => i);
  steps.push({ type: 'done', indices: [], array: [...arr], sortedIndices: allSorted });

  return { steps, comparisons, swaps };
}

/**
 * Runs Quick Sort and returns stats only (no animation) for comparison mode.
 * @param {number[]} array
 * @returns {{ time: number, comparisons: number, swaps: number }}
 */
export function runQuickSort(array) {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function quickSort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  quickSort(arr, 0, arr.length - 1);
  const time = performance.now() - start;
  return { time: parseFloat(time.toFixed(4)), comparisons, swaps };
}
