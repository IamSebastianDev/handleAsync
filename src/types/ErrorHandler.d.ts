/** @format */

export type ErrorHandler<Err extends Error | string> = (error: unknown | null) => Err;
