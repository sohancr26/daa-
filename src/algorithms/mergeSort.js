/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 *
 * Divide and Conquer: splits array into halves, sorts each half recursively,
 * then merges the sorted halves together.
 */

/**
 * Generates animation steps for Merge Sort visualization.
 * @param {number[]} array - The input array to sort
 * @returns {{ steps: Array, comparisons: number, swaps: number }}
 */
export function getMergeSortSteps(array) {
  const arr = [...array];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        array: [...arr],
        sortedIndices: [],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
        swaps++;
      }
      steps.push({
        type: 'swap',
        indices: [k],
        array: [...arr],
        sortedIndices: [],
      });
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({ type: 'swap', indices: [k], array: [...arr], sortedIndices: [] });
      i++; k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({ type: 'swap', indices: [k], array: [...arr], sortedIndices: [] });
      j++; k++;
    }
  }

  function mergeSort(arr, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  mergeSort(arr, 0, arr.length - 1);

  const allSorted = Array.from({ length: arr.length }, (_, i) => i);
  steps.push({ type: 'done', indices: [], array: [...arr], sortedIndices: allSorted });

  return { steps, comparisons, swaps };
}

/**
 * Runs Merge Sort and returns stats only (no animation) for comparison mode.
 * @param {number[]} array
 * @returns {{ time: number, comparisons: number, swaps: number }}
 */
export function runMergeSort(array) {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const start = performance.now();

  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      if (leftArr[i] <= rightArr[j]) { arr[k++] = leftArr[i++]; }
      else { arr[k++] = rightArr[j++]; swaps++; }
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
  }

  function mergeSort(arr, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  mergeSort(arr, 0, arr.length - 1);
  const time = performance.now() - start;
  return { time: parseFloat(time.toFixed(4)), comparisons, swaps };
}
