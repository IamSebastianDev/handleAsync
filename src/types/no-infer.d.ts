/** @format */

/**
 * Utility type used to enforce correct inferring of generics in the AsyncHandler type.
 */
export type NoInfer<T extends any> = [T][T extends any ? 0 : never];
