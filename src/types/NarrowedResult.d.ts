/** @format */

import type { ResultHandler } from './ResultHandler';

export type NarrowedResult<Res> = {
    result: Res;
    complete: (handler: ResultHandler<Res>) => void;
};
