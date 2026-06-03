/**
 * Animation Helper Utility
 * Manages step playback, timing, and animation state for sorting visualizations.
 */

/**
 * Creates a delay promise for animation timing.
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Maps a slider value (1-10) to a millisecond delay.
 * Higher speed value → lower delay.
 * @param {number} speed - Speed value 1 (slowest) to 10 (fastest)
 * @returns {number} Delay in ms
 */
export function speedToDelay(speed) {
  // Exponential scale: speed 1 → 800ms, speed 10 → 5ms
  const minDelay = 5;
  const maxDelay = 800;
  return Math.round(maxDelay * Math.pow(minDelay / maxDelay, (speed - 1) / 9));
}

/**
 * Returns the color class name for a given bar state.
 * @param {number} index
 * @param {object} step - Current animation step
 * @param {boolean} isDark - Dark mode flag
 * @returns {string} Hex color
 */
export function getBarStateColor(index, step, isDone) {
  if (!step) return '#6b7280';
  if (isDone || step.type === 'done') return '#10b981';
  if (step.sortedIndices && step.sortedIndices.includes(index)) return '#10b981';
  if (step.type === 'swap' && step.indices.includes(index)) return '#ef4444';
  if (step.type === 'compare' && step.indices.includes(index)) return '#3b82f6';
  return '#6b7280';
}

/**
 * Formats a time value in ms to a human-readable string.
 * @param {number} ms
 * @returns {string}
 */
export function formatTime(ms) {
  if (ms < 0.01) return '< 0.01 ms';
  if (ms < 1) return `${ms.toFixed(3)} ms`;
  if (ms < 1000) return `${ms.toFixed(2)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}
