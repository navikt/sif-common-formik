import { flattenFieldErrors } from '../typedFormErrorUtils';

describe('teste funksjon flattenFieldErrors', () => {
    it('test 1', () => {
        const input = {
            a: {
                b: {
                    c: {
                        key: 'mykey',
                        values: ['value1', 'value2', 'value3'],
                    },
                },
            },
            d: {
                e: {
                    f: {
                        key: 'mySecondKey',
                        values: (input: any) => input,
                    },
                },
            },
            g: {
                h: {
                    i: {
                        key: 'mySecondKey',
                        values: [(input: any) => input, (input: any) => input],
                    },
                },
            },
        };
        const output = flattenFieldErrors(input);
        const theRightAnswer = {
            'a.b.c': {
                key: 'mykey',
                values: ['value1', 'value2', 'value3'],
            },
            'd.e.f': {
                key: 'mySecondKey',
                values: (input: any) => input,
            },
            'g.h.i': {
                key: 'mySecondKey',
                values: [(input: any) => input, (input: any) => input],
            },
        };
        expect(output).toStrictEqual(theRightAnswer);
    });
});
