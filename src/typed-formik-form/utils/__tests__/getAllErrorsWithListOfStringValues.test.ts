import { flattenFieldErrors } from '../typedFormErrorUtils';

const errorMsg = 'feil';

describe('teste funksjon flattenFieldErrors', () => {
    it('test 1', () => {
        const input = {
            a: {
                b: {
                    c: {
                        mykey: errorMsg,
                    },
                },
            },
            d: {
                e: {
                    f: {
                        mySecondKey: errorMsg,
                    },
                },
            },
        };
        const output = flattenFieldErrors(input);
        const theRightAnswer = {
            'a.b.c.mykey': errorMsg,
            'd.e.f.mySecondKey': errorMsg,
        };
        expect(JSON.stringify(output)).toStrictEqual(JSON.stringify(theRightAnswer));
    });
});
