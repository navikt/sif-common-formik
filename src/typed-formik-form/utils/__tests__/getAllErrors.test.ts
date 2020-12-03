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
        values: { valueKey: 'a value' },
    },
};
const simpleErrors = {
    a: {
        key: 'key1',
        values: { valueKey: 'a value' },
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
                            values: { valueKey: 'a value' },
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
        values: { valueKey: 'a value' },
    },
};

const complex2 = {
    a: [
        {
            b: {
                key: 'key3',
                values: { valueKey: 'a value' },
            },
        },
    ],
};
const complex2Errors = {
    'a.0.b': {
        key: 'key3',
        values: { valueKey: 'a value' },
    },
};

const listWithNullValue = {
    a: [
        null,
        {
            b: {
                key: 'key421341',
                values: { valueKey: 'a value' },
            },
        },
    ],
};
const listWithNullValueErrors = {
    'a.1.b': {
        key: 'key421341',
        values: { valueKey: 'a value' },
    },
};

const combiStor = {
    a: {
        key: 'aksjdb',
        values: { valueKey: 'a value' },
    },
    b: {
        c: {
            d: {
                e: {
                    f: {
                        key: 'pasfvfe',
                        values: { valueKey: 'a value' },
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
                values: { valueKey: 'a value' },
            },
        },
    ],
};
const combiStorErrors = {
    a: {
        key: 'aksjdb',
        values: { valueKey: 'a value' },
    },
    'b.c.d.e.f': {
        key: 'pasfvfe',
        values: { valueKey: 'a value' },
    },
    'g.2.h': {
        key: 'dfoqbnfbf',
        values: { valueKey: 'a value' },
    },
};

const listInList = {
    a: [
        {
            b: {
                key: 'key4',
                values: { valueKey: 'a value' },
            },
            c: {
                d: [
                    {
                        e: {
                            key: 'key4',
                            values: { valueKey: 'a value' },
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
        values: { valueKey: 'a value' },
    },
    'a.0.c.d.0.e': {
        key: 'key4',
        values: { valueKey: 'a value' },
    },
};

const dyptObjectInniListe = {
    a: [
        {
            b: {
                c: {
                    d: {
                        key: 'asflfnqnbfn',
                        values: { valueKey: 'a value' },
                    },
                },
            },
        },
    ],
};
const dyptObjectInniListeErrors = {
    'a.0.b.c.d': {
        key: 'asflfnqnbfn',
        values: { valueKey: 'a value' },
    },
};

describe('teste getAllErrors', () => {
    it('test1', () => {
        const formikInput = { ...formikTemplate, errors: simple };
        const input = getAllErrors(formikInput as any);
        expect(input).toStrictEqual(simpleErrors as any);
    });
    it('test2', () => {
        const formikInput = { ...formikTemplate, errors: complexWorking };
        const input = getAllErrors(formikInput as any);
        expect(input).toStrictEqual(complexWorkingErrors as any);
    });
    it('test3', () => {
        const formikInput = { ...formikTemplate, errors: complex2 };
        const input = getAllErrors(formikInput as any);
        expect(input).toStrictEqual(complex2Errors as any);
    });
    it('test4', () => {
        const formikInput = { ...formikTemplate, errors: listWithNullValue };
        const input = getAllErrors(formikInput as any);
        expect(input).toStrictEqual(listWithNullValueErrors as any);
    });
    it('test5', () => {
        const formikInput = { ...formikTemplate, errors: combiStor };
        const input = getAllErrors(formikInput as any);
        expect(input).toStrictEqual(combiStorErrors as any);
    });

    it('test6', () => {
        const formikInput = { ...formikTemplate, errors: dyptObjectInniListe };
        const input = getAllErrors(formikInput as any);
        expect(input).toStrictEqual(dyptObjectInniListeErrors as any);
    });
    it('test7', () => {
        const formikInput = { ...formikTemplate, errors: listInList };
        const input = getAllErrors(formikInput as any);
        expect(input).toStrictEqual(listInListErrors as any);
    });
});
