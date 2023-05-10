/** @format */

import { isError, convertUnknownToError } from '../utils';

export const assertError = (error: unknown): Error => {
    if (isError(error)) return error;

    return convertUnknownToError(error);
};
