import { flattenFieldErrors } from '../typedFormErrorUtils';

const value = 'abc';

describe('teste funksjon flattenFieldErrors', () => {
    it('test 1', () => {
        const input = {
            a: {
                b: {
                    c: {
                        mykey: value,
                    },
                },
            },
            d: {
                e: {
                    f: {
                        mySecondKey: value,
                    },
                },
            },
        };
        const output = flattenFieldErrors(input);
        const theRightAnswer = {
            'a.b.c.mykey': value,
            'd.e.f.mySecondKey': value,
        };
        expect(output).toStrictEqual(theRightAnswer);
    });
});
