import { flattenFieldErrors } from '../typedFormErrorUtils';

describe('teste funksjon flattenFieldErrors', () => {
    it('test 1', () => {
        const input = {
            a: {
                b: {
                    c: {
                        key: 'mykey',
                        values: 'myvalue',
                    },
                },
            },
            d: {
                e: {
                    f: {
                        key: 'mySecondKey',
                        values: 'otherValues',
                    },
                },
            },
        };
        const output = flattenFieldErrors(input);
        const theRightAnswer = {
            'a.b.c': {
                key: 'mykey',
                values: 'myvalue',
            },
            'd.e.f': {
                key: 'mySecondKey',
                values: 'otherValues',
            },
        };
        expect(output).toStrictEqual(theRightAnswer);
    });
    it('test 2', () => {
        const input = {
            a: [
                {
                    b: {
                        c: [
                            {
                                d: {
                                    key: 'mykey',
                                    values: 'some value',
                                },
                            },
                            null,
                            {
                                d: {
                                    key: 'mySecondKey',
                                    values: 'some other value',
                                },
                            },
                        ],
                    },
                },
                null,
                {
                    b: {
                        c: [
                            {
                                d: {
                                    key: 'a third key',
                                    values: 'a third value of some sort',
                                },
                            },
                        ],
                    },
                },
            ],
        };
        const output = flattenFieldErrors(input);
        const expectedOutput = {
            'a.0.b.c.0.d': {
                key: 'mykey',
                values: 'some value',
            },
            'a.0.b.c.2.d': {
                key: 'mySecondKey',
                values: 'some other value',
            },
            'a.2.b.c.0.d': {
                key: 'a third key',
                values: 'a third value of some sort',
            },
        };

        expect(output).toStrictEqual(expectedOutput);
    });
});
