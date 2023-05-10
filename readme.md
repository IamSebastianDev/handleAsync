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
const { handleAsync, assertError } = require('@iasd/handle-async');

// modern es6 style syntax
import { handleAsync, assertError } from '@iasd/handle-async';
```

In case you included the library file locally or via CDN, the `handleAsync` object is globally available.

```js
const { handleAsync, assertError } = handleAsync;
```

## Usage

## API

## Contributing

### `handleAsync: <Res, Err extends Error | string, Args extends unknown[]>(asyncAction: AsyncAction<Args, Res>,...args: Args): Promise<Result<Res, Err>>`

If you would like to contribute, take a look at the [contribution guide](./contributing.md).

## License

`handleAsync` is licensed under the [MIT License](https://opensource.org/licenses/MIT)
