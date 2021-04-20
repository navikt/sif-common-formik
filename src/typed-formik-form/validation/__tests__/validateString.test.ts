import { ValidateRequiredFieldError } from '../getRequiredFieldValidator';
import getStringValidator, { ValidateStringError } from '../getStringValidator';

describe(`validateString`, () => {
    it(`returns undefined when no options set`, () => {
        expect(getStringValidator()(undefined)).toBeUndefined();
        expect(getStringValidator()(null)).toBeUndefined();
        expect(getStringValidator()('23')).toBeUndefined();
    });
    it(`returns ${ValidateStringError.notAString} when value is not string`, () => {
        expect(getStringValidator()(123)).toBe(ValidateStringError.notAString);
        expect(getStringValidator()([])).toBe(ValidateStringError.notAString);
    });
    it(`returns ${ValidateRequiredFieldError.noValue} when required and no value`, () => {
        expect(getStringValidator({ required: true })(undefined)).toBe(ValidateRequiredFieldError.noValue);
        expect(getStringValidator({ required: true })('')).toBe(ValidateRequiredFieldError.noValue);
        expect(getStringValidator({ required: true })(null)).toBe(ValidateRequiredFieldError.noValue);
    });
    describe('length validation', () => {
        it(`returns undefined when string is within min length and max length`, () => {
            expect(getStringValidator({ minLength: 2 })('12')).toBeUndefined();
            expect(getStringValidator({ minLength: 2 })('112')).toBeUndefined();
            expect(getStringValidator({ maxLength: 5 })('1123')).toBeUndefined();
            expect(getStringValidator({ maxLength: 5 })('11234')).toBeUndefined();
        });
        it(`returns ${ValidateStringError.stringIsTooShort} when string is too short`, () => {
            expect(getStringValidator({ minLength: 2 })('1')).toBe(ValidateStringError.stringIsTooShort);
        });
        it(`returns ${ValidateStringError.stringIsTooLong} when string is too short`, () => {
            expect(getStringValidator({ maxLength: 2 })('123')).toBe(ValidateStringError.stringIsTooLong);
        });
    });
});
