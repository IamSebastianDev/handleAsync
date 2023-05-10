/** @format */

import { AsyncAction, ErrorHandler, NarrowedResult, Result, ResultHandler } from '../types';

/**
 * ```ts
 * import {handleAsync} from "@iasd/handle-async"
 *
 * const { result } = await handleAsync(async () => {...whatever})
 * // returns Promise<{ result, error, errorValue, isOk }>
 *
 * const {result, complete} = (await handleAsync(async () => {...whatever})).error((err) => throw err)
 * const {result, error} = (await handleAsync(async () => {}).graceful((error) => error)
 * ```
 *
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
