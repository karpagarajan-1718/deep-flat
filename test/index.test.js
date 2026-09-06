const assert = require('assert');
const { flatten, flatMap } = require('../src/index');

// flatten depth=1 (default)
assert.deepStrictEqual(flatten([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);

// flatten depth=Infinity
assert.deepStrictEqual(flatten([1, [2, [3, [4]]]], Infinity), [1, 2, 3, 4]);

// flatten already flat
assert.deepStrictEqual(flatten([1, 2, 3]), [1, 2, 3]);

// flatten empty
assert.deepStrictEqual(flatten([]), []);

// flatten depth=0
assert.deepStrictEqual(flatten([1, [2]], 0), [1, [2]]);

// flatMap basic
assert.deepStrictEqual(flatMap([1, 2, 3], x => [x, x * 2]), [1, 2, 2, 4, 3, 6]);

// flatMap with depth
assert.deepStrictEqual(flatMap([1, 2], x => [[x]], 2), [1, 2]);

// flatMap identity
assert.deepStrictEqual(flatMap([1, 2, 3], x => x), [1, 2, 3]);

// type checks
try { flatten('not array'); assert.fail(); } catch(e) { assert(e instanceof TypeError); }
try { flatMap([1], 'not fn'); assert.fail(); } catch(e) { assert(e instanceof TypeError); }

console.log('All tests passed ✓');
