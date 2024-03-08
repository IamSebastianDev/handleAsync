/** @format */

import { isErrorLike } from './isErrorLike.typeguard';

/**
 * Converts a value of unknown type to an `Error`. If the value is an `Error`-like object,
 * the function returns a new `Error` with the properties of the `Error`-like object and
 * `name` set to 'Unknown Exception'.
 *
 * If the value is not an `Error`-like object, the function tries to stringify it and use
 * the resulting string as the message of a new `Error`. If stringifying the value throws
 * an error, the function falls back to converting the value to a string using the `String`
 * constructor.
 *
 * @param {unknown} unknownCaught The value to convert to an `Error`.
 * @returns {Error} The resulting `Error`.
 */

export const convertUnknownToError = (unknownCaught: unknown): Error => {
    if (isErrorLike(unknownCaught)) return { ...unknownCaught, name: 'Unknown Exception' };

    try {
        const value = JSON.stringify(unknownCaught);
        return new Error(value.substring(1, value.length - 1));
    } catch {
        return new Error(String(unknownCaught));
    }
};
