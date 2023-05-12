/** @format */

import { AsyncAction, ErrorHandler, NarrowedResult, Result, ResultHandler } from '../types';

/**
 * Asynchronously handles a specified action, returning a `Result` object
 * that contains details about the outcome of the operation.
 *
 * @async
 * @template Res The type of the result value.
 * @template Err The type of the error, which extends `Error` or `string`.
 * @template Args The types of the arguments accepted by the async action.
 * @param {AsyncAction<Args, Res>} asyncAction The async action to be handled.
 * @param {...Args} args The arguments to pass to the async action.
 * @returns {Promise<Result<Res, Err>>} A promise that resolves to a `Result` object. The `Result` object contains:
 * - `isOk`: A function that returns true if the operation was successful.
 * - `error`: A function that accepts an error handler and returns a `NarrowedResult`. If an error occurred, the error handler is invoked with the error, and the error is re-thrown.
 * - `errorValue`: The error that occurred during the operation, or null if no error occurred.
 * - `result`: The result of the operation, or null if an error occurred.
 * @throws {Err} The error that occurred during the async action, if any.
 *
 * ---
 *
 * ```ts
 * import {handleAsync} from "@iasd/handle-async"
 *
 * const { result } = await handleAsync(async () => {...asyncOperation})
 * // returns Promise<{ result, error, errorValue, isOk }>
 * // result might be null in this case, as errors are not handled
 * // you can use the errorValue returned or the error method to
 * // handle the error manually
 *
 * const {result, complete} = (await handleAsync(async () => {...whatever})).error((err) => throw err)
 * // here, result is not null if no error exists. If an error exists,
 * // the function throws.
 *
 * ```
 */

export const handleAsync = async <Res, Err extends Error | string, Args extends unknown[]>(
    asyncAction: AsyncAction<Args, Res>,
    ...args: Args
): Promise<Result<Res, Err>> => {
    let result: Res | null = null;
    let error: null | unknown = null;

    const completeHandler = (handler: ResultHandler<Res>) => {
        handler(result as Res);
        return {
            result,
        };
    };

    const errorHandler = (handler: ErrorHandler<Err>): NarrowedResult<Res> => {
        if (error) {
            throw handler(error as Err);
        }

        return {
            result: result as Res,
            complete: completeHandler,
        };
    };

    const checkResult = () => {
        return result !== null && error === null;
    };

    try {
        result = await asyncAction(...args);
    } catch (e: unknown) {
        error = e;
    } finally {
        return {
            isOk: checkResult,
            error: errorHandler,
            errorValue: error,
            result,
        };
    }
};
