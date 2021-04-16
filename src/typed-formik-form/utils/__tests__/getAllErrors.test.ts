import { getAndFlattenAllErrors } from '../typedFormErrorUtils';

const errorMsg = 'feil';

const simple = {
    a: errorMsg,
};
const simpleErrors = {
    a: errorMsg,
};

const complexWorking = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            key2: errorMsg,
                        },
                    },
                },
            },
        },
    },
};
const complexWorkingErrors = {
    'a.b.c.d.e.f.key2': errorMsg,
};

const complex2 = {
    a: [
        {
            b: {
                key3: errorMsg,
            },
        },
    ],
};
const complex2Errors = {
    'a.0.b.key3': errorMsg,
};

const listWithNullValue = {
    a: [
        null,
        {
            b: {
                key421341: errorMsg,
            },
        },
    ],
};
const listWithNullValueErrors = {
    'a.1.b.key421341': errorMsg,
};

const combiStor = {
    a: {
        aksjdb: errorMsg,
    },
    b: {
        c: {
            d: {
                e: {
                    f: {
                        pasfvfe: errorMsg,
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
                dfoqbnfbf: errorMsg,
            },
        },
    ],
};
const combiStorErrors = {
    'a.aksjdb': errorMsg,
    'b.c.d.e.f.pasfvfe': errorMsg,
    'g.2.h.dfoqbnfbf': errorMsg,
};

const listInList = {
    a: [
        {
            b: {
                key4: errorMsg,
            },
            c: {
                d: [
                    {
                        e: {
                            key4: errorMsg,
                        },
                    },
                ],
            },
        },
    ],
};
const listInListErrors = {
    'a.0.b.key4': errorMsg,
    'a.0.c.d.0.e.key4': errorMsg,
};

const dyptObjectInniListe = {
    a: [
        {
            b: {
                c: {
                    d: {
                        asflfnqnbfn: errorMsg,
                    },
                },
            },
        },
    ],
};
const dyptObjectInniListeErrors = {
    'a.0.b.c.d.asflfnqnbfn': errorMsg,
};

describe('teste getAllErrors', () => {
    it('test1', () => {
        const input = getAndFlattenAllErrors(simple as any);
        expect(input).toStrictEqual(simpleErrors);
    });
    it('test2', () => {
        const input = getAndFlattenAllErrors(complexWorking as any);
        expect(input).toStrictEqual(complexWorkingErrors);
    });
    it('test3', () => {
        const input = getAndFlattenAllErrors(complex2 as any);
        expect(input).toStrictEqual(complex2Errors);
    });
    it('test4', () => {
        const input = getAndFlattenAllErrors(listWithNullValue as any);
        expect(input).toStrictEqual(listWithNullValueErrors);
    });
    it('test5', () => {
        const input = getAndFlattenAllErrors(combiStor as any);
        expect(input).toStrictEqual(combiStorErrors);
    });
    it('test6', () => {
        const input = getAndFlattenAllErrors(dyptObjectInniListe as any);
        expect(input).toStrictEqual(dyptObjectInniListeErrors);
    });
    it('test7', () => {
        const input = getAndFlattenAllErrors(listInList as any);
        expect(input).toStrictEqual(listInListErrors);
    });
});
