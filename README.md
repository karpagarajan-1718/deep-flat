# deep-flat

Recursive array flattening with configurable depth.

## Usage

```js
const { flatten } = require('deep-flat');

flatten([1, [2, [3, [4]]]], 2);    // [1, 2, 3, [4]]
flatten([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
```

## API

### `flatten(arr, depth = 1)`

- **arr** `Array` — input array
- **depth** `number` — recursion limit (default `1`)

Returns a new flattened array.
