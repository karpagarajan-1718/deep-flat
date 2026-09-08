'use strict';
const assert = require('assert');
const { flatten, flatMap } = require('../src/index');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (e) { failed++; console.log(`  ✗ ${name}: ${e.message}`); }
}

console.log('flatten');
test('flattens one level by default', () => {
  assert.deepStrictEqual(flatten([1, [2, [3]]]), [1, 2, [3]]);
});
test('flattens to specified depth', () => {
  assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], 2), [1, 2, 3, [4]]);
});
test('flattens fully with Infinity', () => {
  assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);
});
test('returns copy for depth 0', () => {
  const arr = [1, [2]];
  const result = flatten(arr, 0);
  assert.deepStrictEqual(result, [1, [2]]);
  assert.notStrictEqual(result, arr);
});
test('handles empty arrays', () => {
  assert.deepStrictEqual(flatten([[], [[]], []]), [[]]);
});
test('throws on non-array', () => {
  assert.throws(() => flatten('abc'), TypeError);
});

console.log('\nflatMap');
test('maps and flattens one level', () => {
  assert.deepStrictEqual(flatMap([1, 2, 3], x => [x, x * 2]), [1, 2, 2, 4, 3, 6]);
});
test('matches native Array.prototype.flatMap', () => {
  const input = [1, 2, 3];
  const fn = x => [x, [x]];
  assert.deepStrictEqual(flatMap(input, fn), input.flatMap(fn));
});
test('handles empty return', () => {
  assert.deepStrictEqual(flatMap([1, 2, 3], x => x === 2 ? [] : [x]), [1, 3]);
});
test('throws on non-function', () => {
  assert.throws(() => flatMap([1], 'nope'), TypeError);
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
console.log('All tests passed ✓');
