import { getAllErrors } from '../typedFormErrorUtils';

const formikTemplate = {
    errors: {},
    status: {
        showErrors: true,
    },
};

// Enkelt object
const simple = {
    a: {
        key: 'key1',
        values: undefined,
    },
};
const simpleErrors = {
    a: {
        key: 'key1',
        values: undefined,
    },
};

// Dypt object
const complexWorking = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            key: 'key2',
                            values: undefined,
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
        values: undefined,
    },
};

// Lister på nivå 1
const complex2 = {
    a: [
        {
            b: {
                key: 'key3',
                values: undefined,
            },
        },
    ],
};
const complex2Errors = {
    'a.0.b': {
        key: 'key3',
        values: undefined,
    },
};

// Liste med null på index 0
const listWithNullValue = {
    a: [
        null,
        {
            b: {
                key: 'key421341',
                values: undefined,
            },
        },
    ],
};
const listWithNullValueErrors = {
    'a.1.b': {
        key: 'key421341',
        values: undefined,
    },
};

const combiStor = {
    a: {
        key: 'aksjdb',
        values: undefined
    },
    b: {
        c: {
            d: {
                e: {
                    f: {
                        key: 'pasfvfe',
                        values: undefined
                    }
                }
            }
        }
    },
    g: [
        null,
        null,
        {
            h: {
                key: 'dfoqbnfbf',
                values: undefined
            }
        }
    ]
}
const combiStorErrors = {
    'a': {
        key: 'aksjdb',
        values: undefined
    },
    'b.c.d.e.f': {
        key: 'pasfvfe',
        values: undefined
    },
    'g.2.h': {
        key: 'dfoqbnfbf',
        values: undefined
    }
}

// Liste i liste
const listInList = {
    a: [
        {
            b: {
                key: 'key4',
                values: undefined,
            },
            c: {
                d: [
                    {
                        e: {
                            key: 'key4',
                            values: undefined,
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
        values: undefined,
    },
    'a.0.c.d.0.e': {
        key: 'key4',
        values: undefined,
    },
};

// Dypt object i liste
const dyptObjectInniListe = {
    a: [
        {
            b: {
                c: {
                    d: {
                        key: 'asflfnqnbfn',
                        values: undefined
                    }
                }
            }
        }
    ]
}
const dyptObjectInniListeErrors = {
    'a.0.b.c.d': {
        key: 'asflfnqnbfn',
        values: undefined
    }
}

describe('asdf', () => {
    it('works', () => {
        const formikInput = { ...formikTemplate, errors: simple };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(simpleErrors);
    });
    it('works', () => {
        const formikInput = { ...formikTemplate, errors: complexWorking };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(complexWorkingErrors);
    });
    it('works', () => {
        const formikInput = { ...formikTemplate, errors: complex2 };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(complex2Errors);
    });
    it('works', () => {
        const formikInput = { ...formikTemplate, errors: listWithNullValue };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(listWithNullValueErrors);
    });
    it('works', () => {
        const formikInput = { ...formikTemplate, errors: combiStor };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(combiStorErrors);
    });

    it('works', () => {
        const formikInput = { ...formikTemplate, errors: dyptObjectInniListe };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(dyptObjectInniListeErrors);
    });
    it('works', () => {
        const formikInput = { ...formikTemplate, errors: listInList };
        // @ts-ignore
        const input = getAllErrors(formikInput);
        expect(input).toStrictEqual(listInListErrors);
    });
});
