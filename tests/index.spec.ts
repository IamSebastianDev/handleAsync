/** @format */

import test from 'ava';
import { handleAsync } from '../src';

// Mock async action for testing
const asyncAction = async (arg: number): Promise<number> => {
    if (arg < 0) {
        throw new Error('Invalid argument');
    }
    return arg * 2;
};

test('handleAsync resolves with result', async (t) => {
    const { result, isOk } = await handleAsync(asyncAction, 2);
    t.true(isOk());
    t.is(result, 4);
});

test('handleAsync throws error', async (t) => {
    const { error, errorValue, isOk } = await handleAsync(asyncAction, -2);
    t.false(isOk());
    t.true(errorValue instanceof Error);
    t.throws(() =>
        error((err) => {
            throw err;
        })
    );
});
