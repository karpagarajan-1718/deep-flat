var assert = require('assert');
var mod = require('../src/index');
var flatten = mod.flatten;
var flatMap = mod.flatMap;

// flatten: depth=1 (default)
assert.deepStrictEqual(flatten([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);

// flatten: depth=Infinity
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);

// flatten: already flat
assert.deepStrictEqual(flatten([1, 2, 3]), [1, 2, 3]);

// flatten: empty
assert.deepStrictEqual(flatten([]), []);

// flatten: depth=0 returns shallow copy
assert.deepStrictEqual(flatten([1, [2]], 0), [1, [2]]);

// flatten: type check
try { flatten('not array'); assert.fail(); } catch(e) { assert(e instanceof TypeError); }

// flatMap: basic
assert.deepStrictEqual(flatMap([1, 2, 3], function(x) { return [x, x * 2]; }), [1, 2, 2, 4, 3, 6]);

// flatMap: empty
assert.deepStrictEqual(flatMap([], function(x) { return [x]; }), []);

// flatMap: identity
assert.deepStrictEqual(flatMap([[1], [2], [3]], function(x) { return x; }), [1, 2, 3]);

// flatMap: type check
try { flatMap('not array', function(x) { return x; }); assert.fail(); } catch(e) { assert(e instanceof TypeError); }

console.log('All 10 tests passed');
