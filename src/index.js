'use strict';

var native;
try { native = require('../lib/native'); } catch (e) { native = null; }

function flatten(arr, depth) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (depth === undefined) depth = 1;
  if (native && native.flatten) return native.flatten(arr, depth);
  if (depth < 1) return arr.slice();
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && depth > 0) {
      var sub = flatten(arr[i], depth - 1);
      for (var j = 0; j < sub.length; j++) result.push(sub[j]);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flatMap(arr, fn) {
  if (!Array.isArray(arr)) throw new TypeError('Expected an array');
  if (typeof fn !== 'function') throw new TypeError('Expected a function');
  if (native && native.flatMap) return native.flatMap(arr, fn);
  return flatten(arr.map(fn), 1);
}

module.exports = { flatten: flatten, flatMap: flatMap };
