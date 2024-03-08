/** @format */
export type AsyncRunner<Result> = (...args: any[]) => Promise<Result>;
