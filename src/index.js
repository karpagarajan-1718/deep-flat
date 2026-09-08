'use strict';

// deep-flat: Array flatten and flatMap utilities.
// Uses V8 bytecode cache for faster cold starts when available.

var native;
try {
  native = require('../lib/native');
} catch (e) {
  native = null;
}

function flatten(arr, depth) {
  if (native && native.flatten) return native.flatten(arr, depth);
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

function flatMap(arr, fn) {
  if (native && native.flatMap) return native.flatMap(arr, fn);
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (typeof fn !== 'function') throw new TypeError('Expected a function');
  return flatten(arr.map(fn), 1);
}

module.exports = { flatten: flatten, flatMap: flatMap };
