/** @format */

import { isError, convertUnknownToError } from '../utils';
/**
 * Asserts that a value is an instance of `Error`. If it's not, the function
 * converts the value to an `Error` instance using the `convertUnknownToError` function.
 *
 * @param {unknown} error The value to assert as an `Error`.
 * @returns {Error} The `Error` instance.
 */
export const assertError = (error: unknown): Error => {
    if (isError(error)) return error;

    return convertUnknownToError(error);
};
