import { flattenFieldErrors } from '../typedFormErrorUtils';

describe('teste funksjon flattenFieldErrors', () => {
    it('test 1', () => {
        const input = {
            a: {
                b: {
                    c: {
                        key: 'mykey',
                        values: { k1: 'value1', k2: 'value2', k3: 'value3' },
                    },
                },
            },
            d: {
                e: {
                    f: {
                        key: 'mySecondKey',
                        values: { k1: (input: any) => input },
                    },
                },
            },
        };
        const output = flattenFieldErrors(input);
        const theRightAnswer = {
            'a.b.c': {
                key: 'mykey',
                values: { k1: 'value1', k2: 'value2', k3: 'value3' },
            },
            'd.e.f': {
                key: 'mySecondKey',
                values: { k1: (input: any) => input },
            },
        };
        expect(JSON.stringify(output)).toStrictEqual(JSON.stringify(theRightAnswer));
    });
});
