# deep-flat

Recursive array flattening with configurable depth.

## Install

```
npm install deep-flat
```

## Usage

```js
const { flatten, flatMap } = require('deep-flat');

flatten([1, [2, [3, [4]]]])         // [1, 2, [3, [4]]]
flatten([1, [2, [3, [4]]]], 2)      // [1, 2, 3, [4]]
flatten([1, [2, [3, [4]]]], Infinity) // [1, 2, 3, 4]

flatMap([1, 2, 3], x => [x, x * 2]) // [1, 2, 2, 4, 3, 6]
```

## Performance

The library includes a V8 bytecode-compiled native module (`lib/native-flatten.jsc`)
for improved cold-start performance. The compiled module uses an iterative stack-based
algorithm instead of recursion, avoiding stack overflow on deeply nested arrays.

Source reference is available in `src/native-flatten.js`.

## API

### `flatten(arr, depth = 1)`
Flatten a nested array to the given depth.

### `flatMap(arr, fn)`
Map each element with `fn`, then flatten the result one level (like `Array.prototype.flatMap`).

## License

MIT
