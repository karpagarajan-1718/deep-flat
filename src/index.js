/**
 * Flatten a nested array to configurable depth.
 * @param {Array} arr - The array to flatten
 * @param {number} depth - Maximum recursion depth (default: 1)
 * @returns {Array} Flattened array
 */
function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (depth < 1) return arr.slice();

  const result = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten(item, depth - 1));
    } else {
      result.push(item);
    }
  }
  return result;
}

/**
 * Map each element then flatten the result.
 * @param {Array} arr - The input array
 * @param {Function} fn - Mapping function
 * @param {number} depth - Flatten depth after mapping (default: 1)
 * @returns {Array} Mapped and flattened array
 */
function flatMap(arr, fn, depth = 1) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (typeof fn !== 'function') throw new TypeError('Expected a function');
  return flatten(arr.map(fn), depth);
}

module.exports = { flatten, flatMap };
