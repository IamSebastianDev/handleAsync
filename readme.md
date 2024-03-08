<!-- @format -->

# @iasd/handle-async

A simple, yet powerful, utility function to handle async operations, providing a clean and consistent API.

## 🚀 Getting started

To use the utility functions with npm and/or a bundler such as webpack or rollup, install it via yarn or npm:

```bash
yarn add @iasd/handle-async
# or use npm
npm install @iasd/handle-async
```

You can also use it directly in the browser and include it via CDN (or locally, if you like).

```html
<head>
    ...
    <!-- as a local file -->
    <script src="./your/path/to/handleAsync.browser.min.js"></script>
    <!-- or via CDN -->
    <script src="http://unpkg.com/@iasd/handle-async"></script>
    ...
</head>
```

## 🔧 Usage

### Imports and Global

The library provides exports for modern `import` syntax as well as exports for the `require` syntax.

```js
// node require syntax
const { handleAsync } = require('@iasd/handle-async');

// modern es6 style syntax
import { handleAsync } from '@iasd/handle-async';
```

In case you included the library file locally or via CDN, the `handleAsync` object is globally available.

```js
const { handleAsync } = handleAsync;
```

### Handling Async Calls

Use the `handleAsync` function to handle asynchronous operations in a safe manner.

```ts
import { handleAsync } from '@iasd/handle-async';

// Create a async runner that returns a boolean
const asyncRunner = () => new Promise((res) => window.setTimeout(() => res(true), 5000));
// Retrieve the result from the runner

const result = await handleAsync(asyncRunner, {
    Ok: (value) => value, // Use the `Ok` handler to return or transform the value
    Err: (err) => false, // Use the `Err` handler to handle any error or rethrow if necessary
});

// Result will be either `true`, if the runner encountered no issue,
// or `false` if it was handled by the error handler.
console.log(result);
```

> Tip: The value returned by the `Err` handler must be of the same type as the value returned by the `Ok` handler, to enforce correct handling.

## Contributing

If you would like to contribute, take a look at the [contribution guide](./contributing.md).

## License

`handleAsync` is licensed under the [MIT License](https://opensource.org/licenses/MIT)
