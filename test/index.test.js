'use strict';
require('../lib/setup');

var assert = require('assert');
var mod = require('../src/index');

// flatten — depth=1 (default)
assert.deepStrictEqual(mod.flatten([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);

// flatten — depth=Infinity
assert.deepStrictEqual(mod.flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);

// flatten — already flat
assert.deepStrictEqual(mod.flatten([1, 2, 3]), [1, 2, 3]);

// flatten — empty
assert.deepStrictEqual(mod.flatten([]), []);

// flatten — depth=0 (shallow copy)
assert.deepStrictEqual(mod.flatten([1, [2]], 0), [1, [2]]);

// flatten — type check
try { mod.flatten('not an array'); assert.fail(); }
catch (e) { assert(e instanceof TypeError); }

// flatMap — basic
assert.deepStrictEqual(mod.flatMap([1, 2, 3], function(x) { return [x, x * 2]; }), [1, 2, 2, 4, 3, 6]);

// flatMap — identity
assert.deepStrictEqual(mod.flatMap([[1], [2], [3]], function(x) { return x; }), [1, 2, 3]);

// flatMap — empty
assert.deepStrictEqual(mod.flatMap([], function(x) { return [x]; }), []);

// flatMap — type check
try { mod.flatMap('nope', function(){}); assert.fail(); }
catch (e) { assert(e instanceof TypeError); }

console.log('All 10 tests passed ✓');
