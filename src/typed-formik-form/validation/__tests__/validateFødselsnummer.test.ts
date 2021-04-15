import validateFødselsnummer, { ValidateFødselsnummerErrors } from '../validateFødselsnummer';

describe(`validateFødselsnummer`, () => {
    const generatedFnr = '24090014427';

    it('returns undefined when the fødselsnummer is valid', () => {
        expect(validateFødselsnummer()(generatedFnr)).toBeUndefined();
    });

    it(`returns ${ValidateFødselsnummerErrors.fødselsnummerNot11Chars} when the fødselsnummer is not 11 chars`, () => {
        expect(validateFødselsnummer()('1234567890')).toEqual(ValidateFødselsnummerErrors.fødselsnummerNot11Chars);
        expect(validateFødselsnummer()('123456789012')).toEqual(ValidateFødselsnummerErrors.fødselsnummerNot11Chars);
    });

    it(`returns ${ValidateFødselsnummerErrors.fødselsnummerChecksumError} when the fødselsnummer has invalid checksum`, () => {
        expect(validateFødselsnummer()('24090014428')).toEqual(ValidateFødselsnummerErrors.fødselsnummerChecksumError);
    });
});
