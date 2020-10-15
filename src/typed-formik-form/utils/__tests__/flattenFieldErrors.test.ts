import { flattenFieldErrors } from '../typedFormErrorUtils';

describe('teste funksjon flattenFieldErrors', () => {
    it('test 1', () => {
        const input = {
            a: {
                b: {
                    c: {
                        key: 'mykey',
                        values: { valueKey: 'myvalue' },
                    },
                },
            },
            d: {
                e: {
                    f: {
                        key: 'mySecondKey',
                        values: { valueKey: 'otherValues' },
                    },
                },
            },
        };
        const output = flattenFieldErrors(input);
        const theRightAnswer = {
            'a.b.c': {
                key: 'mykey',
                values: { valueKey: 'myvalue' },
            },
            'd.e.f': {
                key: 'mySecondKey',
                values: { valueKey: 'otherValues' },
            },
        };
        expect(output).toStrictEqual(theRightAnswer);
    });
});
