/** @format */


export type AsyncHandler<Result, Target> = {
    Ok: (value: Result) => Target;
    Err: (error: Error) => never | NoInfer<Target>;
};
