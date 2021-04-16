import validateFødselsnummer, { ValidateFødselsnummerError } from '../validateFødselsnummer';

describe(`validateFødselsnummer`, () => {
    const generatedFnr = '24090014427';
    const generatedFnr2 = '19035114443';

    it('returns undefined when the fødselsnummer is valid', () => {
        expect(validateFødselsnummer()(generatedFnr)).toBeUndefined();
    });

    it('returns undefined when the fødselsnummer is not required and ha noe value', () => {
        expect(validateFødselsnummer({ required: false })(undefined)).toBeUndefined();
        expect(validateFødselsnummer({ required: false })(null)).toBeUndefined();
        expect(validateFødselsnummer({ required: false })('')).toBeUndefined();
    });

    it(`returns ${ValidateFødselsnummerError.fødselsnummerNot11Chars} when the fødselsnummer is not 11 chars`, () => {
        expect(validateFødselsnummer()('1234567890')).toEqual(ValidateFødselsnummerError.fødselsnummerNot11Chars);
        expect(validateFødselsnummer()('123456789012')).toEqual(ValidateFødselsnummerError.fødselsnummerNot11Chars);
    });

    it(`returns ${ValidateFødselsnummerError.fødselsnummerChecksumError} when the fødselsnummer has invalid checksum`, () => {
        expect(validateFødselsnummer()('24090014428')).toEqual(ValidateFødselsnummerError.fødselsnummerChecksumError);
    });

    it(`returns ${ValidateFødselsnummerError.disallowedFødselsnummer} when the fødselsnummer is same as disallowedFødselsnummer`, () => {
        expect(validateFødselsnummer({ disallowedValues: [generatedFnr] })(generatedFnr)).toEqual(
            ValidateFødselsnummerError.disallowedFødselsnummer
        );
    });
    it(`does not returns ${ValidateFødselsnummerError.disallowedFødselsnummer} when the fødselsnummer is not in disallowedFødselsnummer`, () => {
        expect(validateFødselsnummer({ disallowedValues: [generatedFnr2] })(generatedFnr)).toBeUndefined();
    });
});
