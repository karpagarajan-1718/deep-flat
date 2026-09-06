const assert = require('assert');
const { flatten } = require('../src/index');

// depth=1 (default)
assert.deepStrictEqual(flatten([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);

// depth=Infinity
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);

// already flat
assert.deepStrictEqual(flatten([1, 2, 3]), [1, 2, 3]);

// empty
assert.deepStrictEqual(flatten([]), []);

// depth=0 returns shallow copy
assert.deepStrictEqual(flatten([1, [2]], 0), [1, [2]]);

// type check
try { flatten('not array'); assert.fail(); } catch(e) { assert(e instanceof TypeError); }

console.log('All tests passed ✓');
