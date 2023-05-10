/** @format */

import { isErrorLike } from './isErrorLike.typeguard';

export const convertUnknownToError = (unknownCaught: unknown): Error => {
    if (isErrorLike(unknownCaught)) return { ...unknownCaught, name: 'Unknown Exception' };

    try {
        return new Error(JSON.stringify(unknownCaught));
    } catch {
        return new Error(String(unknownCaught));
    }
};
