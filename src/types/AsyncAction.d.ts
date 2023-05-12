/** @format */
import type { Result } from './Result';

export type AsyncAction<Args extends Array<unknown>, Res> = (...args: Args) => Promise<Res>;
