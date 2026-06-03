/**
 * Array Generator Utility
 * Generates various types of arrays for sorting visualization.
 */

/**
 * Generates a random array of integers.
 * @param {number} size - Number of elements
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number[]}
 */
export function generateRandomArray(size, min = 5, max = 400) {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Generates a nearly sorted array.
 * @param {number} size
 * @returns {number[]}
 */
export function generateNearlySortedArray(size) {
  const arr = Array.from({ length: size }, (_, i) => Math.floor((i / size) * 390) + 10);
  // Swap a few random pairs
  const swaps = Math.floor(size * 0.05);
  for (let i = 0; i < swaps; i++) {
    const a = Math.floor(Math.random() * size);
    const b = Math.floor(Math.random() * size);
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
  return arr;
}

/**
 * Generates a reverse-sorted array.
 * @param {number} size
 * @returns {number[]}
 */
export function generateReverseSortedArray(size) {
  return Array.from({ length: size }, (_, i) =>
    Math.floor(((size - i) / size) * 390) + 10
  );
}

/**
 * Generates an array with many duplicate values.
 * @param {number} size
 * @returns {number[]}
 */
export function generateFewUniqueArray(size) {
  const values = [50, 100, 150, 200, 250, 300, 350];
  return Array.from({ length: size }, () => values[Math.floor(Math.random() * values.length)]);
}

/**
 * Returns the bar color based on its state in the animation.
 * @param {number} index - Bar index
 * @param {number[]} compareIndices - Indices being compared
 * @param {number[]} swapIndices - Indices being swapped
 * @param {number[]} sortedIndices - Sorted indices
 * @param {boolean} isDone - Whether sorting is complete
 * @returns {string} CSS color string
 */
export function getBarColor(index, compareIndices, swapIndices, sortedIndices, isDone) {
  if (isDone || sortedIndices.includes(index)) return '#10b981'; // green - sorted
  if (swapIndices.includes(index)) return '#ef4444';            // red - swapping
  if (compareIndices.includes(index)) return '#3b82f6';         // blue - comparing
  return '#6b7280';                                              // gray - default
}
