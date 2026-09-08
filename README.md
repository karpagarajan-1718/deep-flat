# deep-flat

Fast, zero-dependency array flattening and mapping for Node.js.

## Install

```
npm install deep-flat
```

## API

### `flatten(arr, depth?)`

Recursively flattens a nested array to the specified `depth` (default: `1`).

```js
const { flatten } = require('deep-flat');

flatten([1, [2, [3, [4]]]], 2);       // [1, 2, 3, [4]]
flatten([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
```

### `flatMap(arr, fn)`

Maps each element through `fn`, then flattens the result one level.

```js
const { flatMap } = require('deep-flat');

flatMap([1, 2, 3], x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
```

## Testing

```bash
npm test
```

Runs the full test suite — 10 assertions covering edge cases for both
`flatten` and `flatMap`. Tests are self-contained with no external
dependencies or setup required.

## License

MIT
