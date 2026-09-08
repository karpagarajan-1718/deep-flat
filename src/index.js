'use strict';

/**
 * Flatten a nested array to configurable depth (iterative).
 * @param {Array} arr
 * @param {number} [depth=1]
 * @returns {Array}
 */
function flatten(arr, depth) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (depth === undefined) depth = 1;
  if (depth < 1) return arr.slice();

  var result = [];
  var stack = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    stack.push([arr[i], depth]);
  }
  while (stack.length) {
    var pair = stack.pop();
    var val = pair[0];
    var d = pair[1];
    if (Array.isArray(val) && d > 0) {
      for (var j = val.length - 1; j >= 0; j--) {
        stack.push([val[j], d - 1]);
      }
    } else {
      result.push(val);
    }
  }
  return result;
}

/**
 * Map each element then flatten the result one level.
 * @param {Array} arr
 * @param {Function} fn
 * @returns {Array}
 */
function flatMap(arr, fn) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (typeof fn !== 'function') throw new TypeError('Expected a function');
  return flatten(arr.map(fn), 1);
}

module.exports = { flatten: flatten, flatMap: flatMap };
