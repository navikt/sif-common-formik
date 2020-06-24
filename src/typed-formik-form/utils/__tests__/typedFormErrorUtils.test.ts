import { getAllErrors } from '../typedFormErrorUtils';

const formikTemplate = {
    errors: {},
    status: {
        showErrors: true,
    },
};

const formikErrors1 = {
    ...formikTemplate,
    errors: {
        annetArbeidsforhold: {
            harHattFraværHosArbeidsgiver: {
                key: 'common.fieldvalidation.påkrevd',
                values: undefined,
            },
        },
        harFosterbarn: {
            key: 'common.fieldvalidation.påkrevd',
            values: undefined,
        },
        arbeidsforhold: [
            {
                harHattFraværHosArbeidsgiver: {
                    key: 'common.fieldvalidation.påkrevd',
                    values: undefined,
                },
            },
            {
                harHattFraværHosArbeidsgiver: {
                    key: 'common.fieldvalidation.påkrevd',
                    values: undefined,
                },
            },
        ],
    },
};

const expectedErrors1 = {
    'annetArbeidsforhold.harHattFraværHosArbeidsgiver': {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
    harFosterbarn: {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
    'arbeidsforhold.0.harHattFraværHosArbeidsgiver': {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
    'arbeidsforhold.1.harHattFraværHosArbeidsgiver': {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
};

const formikErrors2 = {
    ...formikTemplate,
    errors: {
        arbeidsforhold: [
            {
                arbeidsgiverHarUtbetaltLønn: {
                    key: 'common.fieldvalidation.påkrevd',
                    values: undefined,
                },
            },
        ],
    },
};

const expectedErrors2 = {
    'arbeidsforhold.0.arbeidsgiverHarUtbetaltLønn': {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
};

const formikErrors3 = {
    ...formikTemplate,
    errors: {
        arbeidsforhold: [
            {
                ansettelseslengde: {
                    ingenAvSituasjoneneForklaring: {
                        key: 'common.fieldvalidation.påkrevd',
                        values: undefined,
                    },
                },
            },
        ],
    },
};

const expectedErrors3 = {
    'arbeidsforhold.0.ansettelseslengde.ingenAvSituasjoneneForklaring': {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
};

const formikErrors4 = {
    ...formikTemplate,
    errors: {
        arbeidsforhold: [
            null,
            {
                arbeidsgiverHarUtbetaltLønn: {
                    key: 'common.fieldvalidation.påkrevd',
                    values: undefined,
                },
            },
        ],
    },
};

const expectedErrors4 = {
    'arbeidsforhold.1.arbeidsgiverHarUtbetaltLønn': {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
};

const formikErrors5 = {
    ...formikTemplate,
    errors: {
        annetArbeidsforhold: {
            arbeidsgiverHarUtbetaltLønn: {
                key: 'common.fieldvalidation.påkrevd',
                values: undefined,
            },
        },
    },
};

const expectedErrors5 = {
    'annetArbeidsforhold.arbeidsgiverHarUtbetaltLønn': {
        key: 'common.fieldvalidation.påkrevd',
        values: undefined,
    },
};

describe('flattening errors', () => {
    it('example 1', () => {
        // @ts-ignore
        expect(getAllErrors(formikErrors1)).toStrictEqual(expectedErrors1);
    });
    // it('example 2', () => {
    //     // @ts-ignore
    //     expect(getAllErrors(formikErrors2)).toStrictEqual(expectedErrors2);
    // });

    // it('example 3', () => {
    //     // @ts-ignore
    //     expect(getAllErrors(formikErrors3)).toStrictEqual(expectedErrors3);
    // });

    // it('example 4', () => {
    //     // @ts-ignore
    //     expect(getAllErrors(formikErrors4)).toStrictEqual(expectedErrors4);
    // });
    // it('example 5', () => {
    //     // @ts-ignore
    //     expect(getAllErrors(formikErrors5)).toStrictEqual(expectedErrors5);
    // });
});
