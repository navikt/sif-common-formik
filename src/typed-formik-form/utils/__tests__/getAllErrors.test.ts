import { getAllErrors } from '../typedFormErrorUtils';

const formikTemplate = {
    errors: {},
    status: {
        showErrors: true,
    },
};

const simple = {
    a: {
        key: 'key1',
        values: 'a value',
    },
};
const simpleErrors = {
    a: {
        key: 'key1',
        values: 'a value',
    },
};

const complexWorking = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            key: 'key2',
                            values: 'a value',
                        },
                    },
                },
            },
        },
    },
};
const complexWorkingErrors = {
    'a.b.c.d.e.f': {
        key: 'key2',
        values: 'a value',
    },
};

const complex2 = {
    a: [
        {
            b: {
                key: 'key3',
                values: 'a value',
            },
        },
    ],
};
const complex2Errors = {
    'a.0.b': {
        key: 'key3',
        values: 'a value',
    },
};

const listWithNullValue = {
    a: [
        null,
        {
            b: {
                key: 'key421341',
                values: 'a value',
            },
        },
    ],
};
const listWithNullValueErrors = {
    'a.1.b': {
        key: 'key421341',
        values: 'a value',
    },
};

const combiStor = {
    a: {
        key: 'aksjdb',
        values: 'a value',
    },
    b: {
        c: {
            d: {
                e: {
                    f: {
                        key: 'pasfvfe',
                        values: 'a value',
                    },
                },
            },
        },
    },
    g: [
        null,
        null,
        {
            h: {
                key: 'dfoqbnfbf',
                values: 'a value',
            },
        },
    ],
};
const combiStorErrors = {
    a: {
        key: 'aksjdb',
        values: 'a value',
    },
    'b.c.d.e.f': {
        key: 'pasfvfe',
        values: 'a value',
    },
    'g.2.h': {
        key: 'dfoqbnfbf',
        values: 'a value',
    },
};

const listInList = {
    a: [
        {
            b: {
                key: 'key4',
                values: 'a value',
            },
            c: {
                d: [
                    {
                        e: {
                            key: 'key4',
                            values: 'a value',
                        },
                    },
                ],
            },
        },
    ],
};
const listInListErrors = {
    'a.0.b': {
        key: 'key4',
        values: 'a value',
    },
    'a.0.c.d.0.e': {
        key: 'key4',
        values: 'a value',
    },
};

const dyptObjectInniListe = {
    a: [
        {
            b: {
                c: {
                    d: {
                        key: 'asflfnqnbfn',
                        values: 'a value',
                    },
                },
            },
        },
    ],
};
const dyptObjectInniListeErrors = {
    'a.0.b.c.d': {
        key: 'asflfnqnbfn',
        values: 'a value',
    },
};

describe('teste getAllErrors', () => {
    it('test1', () => {
        const formikInput = { ...formikTemplate, errors: simple };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(simpleErrors);
    });
    it('test2', () => {
        const formikInput = { ...formikTemplate, errors: complexWorking };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(complexWorkingErrors);
    });
    it('test3', () => {
        const formikInput = { ...formikTemplate, errors: complex2 };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(complex2Errors);
    });
    it('test4', () => {
        const formikInput = { ...formikTemplate, errors: listWithNullValue };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(listWithNullValueErrors);
    });
    it('test5', () => {
        const formikInput = { ...formikTemplate, errors: combiStor };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(combiStorErrors);
    });

    it('test6', () => {
        const formikInput = { ...formikTemplate, errors: dyptObjectInniListe };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(dyptObjectInniListeErrors);
    });
    it('test7', () => {
        const formikInput = { ...formikTemplate, errors: listInList };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(listInListErrors);
    });
});
