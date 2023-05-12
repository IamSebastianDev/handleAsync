/** @format */

import { ErrorLike } from '../types';

export const isErrorLike = (error: unknown): error is ErrorLike => {
    return typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string';
};
