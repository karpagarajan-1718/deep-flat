'use strict';

// native-flatten.js - Array utility functions (iterative).
// Compiled to V8 bytecode: lib/native-flatten.jsc

function flatten(arr, depth) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  if (depth === void 0) depth = 1;
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
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  return flatten(arr.map(fn), 1);
}

function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  if (typeof size !== 'number' || size < 1) {
    throw new TypeError('Expected a positive number');
  }
  var result = [];
  for (var i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function uniq(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  var seen = {};
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var key = typeof arr[i] + ':' + String(arr[i]);
    if (!seen[key]) {
      seen[key] = true;
      result.push(arr[i]);
    }
  }
  return result;
}

function compact(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) result.push(arr[i]);
  }
  return result;
}

function groupBy(arr, fn) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  var groups = {};
  for (var i = 0; i < arr.length; i++) {
    var key = String(fn(arr[i], i, arr));
    if (!groups[key]) groups[key] = [];
    groups[key].push(arr[i]);
  }
  return groups;
}



function partition(arr, fn) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  var yes = [];
  var no = [];
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      yes.push(arr[i]);
    } else {
      no.push(arr[i]);
    }
  }
  return [yes, no];
}
module.exports = { flatten: flatten, flatMap: flatMap, chunk: chunk, uniq: uniq, compact: compact, groupBy: groupBy };
