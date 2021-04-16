import validateString, { ValidateStringErrors } from '../validateString';

describe(`validateString`, () => {
    it(`returns undefined when no options set`, () => {
        expect(validateString()(undefined)).toBeUndefined();
        expect(validateString()(null)).toBeUndefined();
        expect(validateString()('23')).toBeUndefined();
    });
    it(`returns ${ValidateStringErrors.invalidType} when value is not string`, () => {
        expect(validateString()(123)).toBe(ValidateStringErrors.invalidType);
        expect(validateString()([])).toBe(ValidateStringErrors.invalidType);
    });
    it(`returns ${ValidateStringErrors.noValue} when required and no value`, () => {
        expect(validateString({ required: true })(undefined)).toBe(ValidateStringErrors.noValue);
        expect(validateString({ required: true })('')).toBe(ValidateStringErrors.noValue);
        expect(validateString({ required: true })(null)).toBe(ValidateStringErrors.noValue);
    });
    describe('length validation', () => {
        it(`returns undefined when string is within min length and max length`, () => {
            expect(validateString({ minLength: 2 })('12')).toBeUndefined();
            expect(validateString({ minLength: 2 })('112')).toBeUndefined();
            expect(validateString({ maxLength: 5 })('1123')).toBeUndefined();
            expect(validateString({ maxLength: 5 })('11234')).toBeUndefined();
        });
        it(`returns ${ValidateStringErrors.tooShort} when string is too short`, () => {
            expect(validateString({ minLength: 2 })('1')).toBe(ValidateStringErrors.tooShort);
        });
        it(`returns ${ValidateStringErrors.tooLong} when string is too short`, () => {
            expect(validateString({ maxLength: 2 })('123')).toBe(ValidateStringErrors.tooLong);
        });
    });
});
