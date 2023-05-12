/** @format */

import type { ErrorHandler } from './ErrorHandler';
import type { ResultHandler } from './ResultHandler';
import type { NarrowedResult } from './NarrowedResult';

export type Result<Res, Err extends Error | string> = {
    error: (handler: ErrorHandler<Err>) => NarrowedResult<Res>;
    isOk: () => boolean;
    errorValue: unknown | null;
    result: Res | null;
};
