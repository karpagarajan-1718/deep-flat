'use strict';
var env = require('./env');
var assert = require('assert');
var mod = require('../src/index');
var flatten = mod.flatten;
var flatMap = mod.flatMap;

var passed = 0;
var total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log('  ✓ ' + name);
  } catch(e) {
    console.log('  ✗ ' + name + ': ' + e.message);
    process.exitCode = 1;
  }
}

console.log('\n  flatten');

test('depth-1 default', function() {
  assert.deepStrictEqual(flatten([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);
});

test('depth Infinity', function() {
  assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);
});

test('already flat', function() {
  assert.deepStrictEqual(flatten([1, 2, 3]), [1, 2, 3]);
});

test('empty array', function() {
  assert.deepStrictEqual(flatten([]), []);
});

test('depth zero returns copy', function() {
  assert.deepStrictEqual(flatten([1, [2]], 0), [1, [2]]);
});

test('throws on non-array', function() {
  var threw = false;
  try { flatten('not array'); } catch(e) { threw = e instanceof TypeError; }
  assert.strictEqual(threw, true);
});

console.log('\n  flatMap');

test('basic mapping', function() {
  assert.deepStrictEqual(flatMap([1, 2, 3], function(x) { return [x, x * 2]; }), [1, 2, 2, 4, 3, 6]);
});

test('identity', function() {
  assert.deepStrictEqual(flatMap([1, 2, 3], function(x) { return [x]; }), [1, 2, 3]);
});

test('empty result', function() {
  assert.deepStrictEqual(flatMap([1, 2, 3], function() { return []; }), []);
});

test('throws on non-function', function() {
  var threw = false;
  try { flatMap([1], 'not fn'); } catch(e) { threw = e instanceof TypeError; }
  assert.strictEqual(threw, true);
});

console.log('\n  ' + passed + '/' + total + ' tests passed');
console.log('  env: ' + env.platform + ' / ' + env.nodeVersion + '\n');
