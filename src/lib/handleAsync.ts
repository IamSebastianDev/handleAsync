/** @format */

import { AsyncHandler } from '../types/async-handler';
import { AsyncRunner } from '../types/async-runner';
import { assertError } from './assertError';

/**
 * Executes an asynchronous operation provided by the `runner`, handling the result
 * through the specified `handler`. This function abstracts error handling and result
 * transformation to provide a more streamlined async control flow.
 *
 * @async
 * @template Result The type of the result produced by the `runner`.
 * @template Target The type of the result after being processed by the `handler`.
 * @param {AsyncRunner<Result>} runner A function that executes an async operation and returns a promise.
 * @param {AsyncHandler<Result, Target>} handler An object containing `Ok` and `Err` methods for result handling:
 * - `Ok`: A function that processes the result of the async operation if it's successful.
 * - `Err`: A function that processes any errors thrown during the async operation.
 * @returns {Promise<Target>} A promise that resolves to the processed result (`Target`) after applying the `Ok` or `Err` handler,
 * depending on whether the operation succeeded or failed. The promise may also be rejected if an error occurs that is not handled by `Err`.
 *
 * The primary purpose of this function is to provide a structured way to handle asynchronous operations, encapsulating
 * the complexity of error handling and result transformation. This allows for cleaner, more readable code when dealing with
 * asynchronous logic.
 */
export const handleAsync = async <Result, Target = Result>(
    runner: AsyncRunner<Result>,
    handler: AsyncHandler<Result, Target>,
): Promise<Target> => {
    const { Ok, Err } = handler;

    return new Promise((resolve, reject) =>
        runner()
            // Pass result to result handler
            .then((result) => resolve(Ok(result)))
            // Pass error to the error handler to handle
            .catch((error) => resolve(Err(assertError(error))))
            // Pass rethrow'n error to the rejector, to reject the promise
            .catch((err) => reject(err)),
    );
};
