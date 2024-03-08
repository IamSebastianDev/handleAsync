/** @format */

import test from 'ava';
import { handleAsync, assertError } from '../src';

// Declare a runner that can be configured to fail
const runner = (type: boolean) => async () => {
    if (type) return 'Success';
    throw new Error(`Failure`);
};

/**
 * handleAsync Tests
 */

test('[handleAsync] returns the correct value for a successful operation', async (t) => {
    const result = await handleAsync(runner(true), {
        Ok: (value) => `OK: ${value}`,
        Err: (err) => err.message,
    });
    t.is(result, 'OK: Success');
});

test('[handleAsync] correctly rethrows an error during error handling', async (t) => {
    await t.throwsAsync(
        async () => {
            return handleAsync(runner(false), {
                Ok: (value) => `OK: Failed`,
                Err: (err) => {
                    throw new Error(`ERROR: ${err.message}`);
                },
            });
        },
        { instanceOf: Error, message: /^ERROR: Failure/ },
    );
});

test('[handleAsync] returns the correct value when an error is handled', async (t) => {
    const result = await handleAsync(runner(false), {
        Ok: (value) => `OK: Failed`,
        Err: (err) => `OK: ${err.message}`,
    });

    t.is(result, 'OK: Failure');
});

// Test assertError function for various inputs
test('[assertError] returns the same Error object if an Error is passed', (t) => {
    const inputError = new Error('Test error');
    const result = assertError(inputError);
    t.is(result, inputError);
});

test('[assertError] converts a non-Error to an Error object', (t) => {
    const notAnError = 'Just a string';
    const result = assertError(notAnError);
    t.true(result instanceof Error);
    t.is(result.message, 'Just a string');
});
