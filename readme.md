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

### Handling Async Calls

Use the `handleAsync` function to handle asynchronous operations in a safe manner.

```ts
import { handleAsync } from '@iasd/handle-async';

const asyncOperation = () => new Promise((res) => window.setTimeout(() => res(true), 5000));

const { result, errorValue } = await handleAsync(asyncOperation);
// result will be either null or true, depending on if the
// operation succeeded or not.
// errorValue will contain any Error thrown by the asynchronous operation
// or null, if the operation succeeded
```

You can also explicitly handle the error, if an error exists.

```ts
import { handleAsync } from '@iasd/handle-async';

const asyncOperation = () => new Promise((res) => window.setTimeout(() => res(true), 5000));

const { result } = (await handleAsync(asyncOperation)).error((error) => console.log({ error }));
// Using the error method of the results object causes any error to throw,
// but will also narrow the result to be the provided value, assuming the
// async operation will only ever return an error or a result.
```

## API

### `handleAsync: <Res, Err extends Error | string, Args extends unknown[]>(asyncAction: AsyncAction<Args, Res>,...args: Args): Promise<Result<Res, Err>>`

Asynchronously handles a specified action, returning a `Result` object that contains details about the outcome of the operation.

`Signature`

```ts
handleAsync<Res, Err extends Error | string, Args extends unknown[]>(
    asyncAction: AsyncAction<Args, Res>,
    ...args: Args
): Promise<Result<Res, Err>>
```

`Parameters`

-   `asyncAction` (type: `AsyncAction<Args, Res>`): The async action to be handled.
-   `args` (type: `...Args`): The arguments to pass to the async action.

`Returns`

A promise that resolves to a `Result` object. The `Result` object contains the following properties:

-   `isOk` (type: `function`): A function that returns `true` if the operation was successful.
-   `error` (type: `function`): A function that accepts an error handler and returns a `NarrowedResult`. If an error occurred, the error handler is invoked with the error, and the error is re-thrown.
-   `errorValue` (type: `Err | null`): The error that occurred during the operation, or `null` if no error occurred.
-   `result` (type: `Res | null`): The result of the operation, or `null` if an error occurred.

`Throws`

-   `Err`: The error that occurred during the async action, if any.

`Example`

```ts
import { handleAsync } from '@iasd/handle-async';

const { result } = await handleAsync(async () => {
    /* async operation */
});
// returns Promise<{ result, error, errorValue, isOk }>
// result might be null in this case, as errors are not handled
// you can use the errorValue returned or the error method to
// handle the error manually

const { result, complete } = (
    await handleAsync(async () => {
        /* whatever */
    })
).error((err) => {
    throw err;
});
// here, result is not null if no error exists. If an error exists,
// the function throws.
```

### `assertError`

Asserts that a value is an instance of `Error`. If it's not, the function converts the value to an `Error` instance using the `convertUnknownToError` function.

`Signature`

```ts
assertError(error: unknown): Error
```

`Parameters`

-   `error` (type: `unknown`): The value to assert as an `Error`.

`Returns`

The `Error` instance.

`Example`

```ts
import { assertError } from '../path/to/assertError';

const error = new Error('An error occurred');
const result = assertError(error);
// result is the same as the input error

const unknownValue = 'This is not an error';
const convertedError = assertError(unknownValue);
// convertedError is an Error instance with a message based on the input value
```

## Contributing

If you would like to contribute, take a look at the [contribution guide](./contributing.md).

## License

`handleAsync` is licensed under the [MIT License](https://opensource.org/licenses/MIT)
