import getFødselsnummerValidator, { ValidateFødselsnummerError } from '../getFødselsnummerValidator';

describe(`validateFødselsnummer`, () => {
    const generatedFnr = '24090014427';
    const generatedFnr2 = '19035114443';

    it('returns undefined when the fødselsnummer is valid', () => {
        expect(getFødselsnummerValidator()(generatedFnr)).toBeUndefined();
    });

    it('returns undefined when the fødselsnummer is not required and ha noe value', () => {
        expect(getFødselsnummerValidator({ required: false })(undefined)).toBeUndefined();
        expect(getFødselsnummerValidator({ required: false })(null)).toBeUndefined();
        expect(getFødselsnummerValidator({ required: false })('')).toBeUndefined();
    });

    it(`returns ${ValidateFødselsnummerError.fødselsnummerNot11Chars} when the fødselsnummer is not 11 chars`, () => {
        expect(getFødselsnummerValidator()('1234567890')).toEqual(ValidateFødselsnummerError.fødselsnummerNot11Chars);
        expect(getFødselsnummerValidator()('123456789012')).toEqual(ValidateFødselsnummerError.fødselsnummerNot11Chars);
    });

    it(`returns ${ValidateFødselsnummerError.disallowedFødselsnummer} when the fødselsnummer is same as disallowedFødselsnummer`, () => {
        expect(getFødselsnummerValidator({ disallowedValues: [generatedFnr] })(generatedFnr)).toEqual(
            ValidateFødselsnummerError.disallowedFødselsnummer
        );
    });
    it(`does not returns ${ValidateFødselsnummerError.disallowedFødselsnummer} when the fødselsnummer is not in disallowedFødselsnummer`, () => {
        expect(getFødselsnummerValidator({ disallowedValues: [generatedFnr2] })(generatedFnr)).toBeUndefined();
    });
});
