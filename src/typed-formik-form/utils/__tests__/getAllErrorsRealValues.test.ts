import { getAndFlattenAllErrors } from '../typedFormErrorUtils';

const errorMsg = 'feil';

const formikErrors1 = {
    annetArbeidsforhold: {
        harHattFraværHosArbeidsgiver: errorMsg,
    },
    harFosterbarn: errorMsg,
    arbeidsforhold: [
        {
            harHattFraværHosArbeidsgiver: errorMsg,
        },
        {
            harHattFraværHosArbeidsgiver: errorMsg,
        },
    ],
};

const expectedErrors1 = {
    'annetArbeidsforhold.harHattFraværHosArbeidsgiver': errorMsg,
    harFosterbarn: errorMsg,
    'arbeidsforhold.0.harHattFraværHosArbeidsgiver': errorMsg,
    'arbeidsforhold.1.harHattFraværHosArbeidsgiver': errorMsg,
};

const formikErrors2 = {
    arbeidsforhold: [
        {
            arbeidsgiverHarUtbetaltLønn: errorMsg,
        },
    ],
};

const expectedErrors2 = {
    'arbeidsforhold.0.arbeidsgiverHarUtbetaltLønn': errorMsg,
};

const formikErrors3 = {
    arbeidsforhold: [
        {
            ansettelseslengde: {
                ingenAvSituasjoneneForklaring: errorMsg,
            },
        },
    ],
};

const expectedErrors3 = {
    'arbeidsforhold.0.ansettelseslengde.ingenAvSituasjoneneForklaring': errorMsg,
};

const formikErrors4 = {
    arbeidsforhold: [
        null,
        {
            arbeidsgiverHarUtbetaltLønn: errorMsg,
        },
    ],
};

const expectedErrors4 = {
    'arbeidsforhold.1.arbeidsgiverHarUtbetaltLønn': errorMsg,
};

const formikErrors5 = {
    annetArbeidsforhold: {
        arbeidsgiverHarUtbetaltLønn: errorMsg,
    },
};

const expectedErrors5 = {
    'annetArbeidsforhold.arbeidsgiverHarUtbetaltLønn': errorMsg,
};

describe('teste getAndFlattenAllErrors med gode eksempelverdier', () => {
    it('example 1', () => {
        expect(getAndFlattenAllErrors<any>(formikErrors1)).toStrictEqual(expectedErrors1);
    });
    it('example 2', () => {
        expect(getAndFlattenAllErrors<any>(formikErrors2)).toStrictEqual(expectedErrors2);
    });

    it('example 3', () => {
        expect(getAndFlattenAllErrors<any>(formikErrors3)).toStrictEqual(expectedErrors3);
    });

    it('example 4', () => {
        expect(getAndFlattenAllErrors<any>(formikErrors4 as any)).toStrictEqual(expectedErrors4);
    });
    it('example 5', () => {
        expect(getAndFlattenAllErrors<any>(formikErrors5)).toStrictEqual(expectedErrors5);
    });
});
