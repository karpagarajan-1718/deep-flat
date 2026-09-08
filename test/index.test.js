'use strict';
var assert = require('assert');
var { flatten, flatMap } = require('../src/index');

var passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.log('  ✗ ' + name + ': ' + e.message); }
}

console.log('flatten');
test('flattens one level by default', function() { assert.deepStrictEqual(flatten([1, [2, [3]]]), [1, 2, [3]]); });
test('flattens to specified depth', function() { assert.deepStrictEqual(flatten([1, [2, [3]]], 2), [1, 2, 3]); });
test('flattens fully with Infinity', function() { assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]); });
test('returns copy for depth 0', function() { var a = [1, [2]]; var r = flatten(a, 0); assert.deepStrictEqual(r, [1, [2]]); assert.notStrictEqual(r, a); });
test('handles empty arrays', function() { assert.deepStrictEqual(flatten([]), []); });
test('throws on non-array', function() { assert.throws(function() { flatten('abc'); }, TypeError); });

console.log('\nflatMap');
test('maps and flattens one level', function() { assert.deepStrictEqual(flatMap([1, 2, 3], function(x) { return [x, x * 2]; }), [1, 2, 2, 4, 3, 6]); });
test('matches native Array.prototype.flatMap', function() { var a = [1, 2, 3]; var fn = function(x) { return [x, x + 10]; }; assert.deepStrictEqual(flatMap(a, fn), a.flatMap(fn)); });
test('handles empty return', function() { assert.deepStrictEqual(flatMap([1, 2, 3], function() { return []; }), []); });
test('throws on non-function', function() { assert.throws(function() { flatMap([1], 'x'); }, TypeError); });

console.log('\n' + passed + ' passed, ' + failed + ' failed');
if (failed > 0) { console.log('FAILED'); process.exit(1); }
console.log('All tests passed ✓');
