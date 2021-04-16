import { ValidateRequiredValueError } from '../validateRequiredValue';
import validateString, { ValidateStringError } from '../validateString';

describe(`validateString`, () => {
    it(`returns undefined when no options set`, () => {
        expect(validateString()(undefined)).toBeUndefined();
        expect(validateString()(null)).toBeUndefined();
        expect(validateString()('23')).toBeUndefined();
    });
    it(`returns ${ValidateStringError.notAString} when value is not string`, () => {
        expect(validateString()(123)).toBe(ValidateStringError.notAString);
        expect(validateString()([])).toBe(ValidateStringError.notAString);
    });
    it(`returns ${ValidateRequiredValueError.noValue} when required and no value`, () => {
        expect(validateString({ required: true })(undefined)).toBe(ValidateRequiredValueError.noValue);
        expect(validateString({ required: true })('')).toBe(ValidateRequiredValueError.noValue);
        expect(validateString({ required: true })(null)).toBe(ValidateRequiredValueError.noValue);
    });
    describe('length validation', () => {
        it(`returns undefined when string is within min length and max length`, () => {
            expect(validateString({ minLength: 2 })('12')).toBeUndefined();
            expect(validateString({ minLength: 2 })('112')).toBeUndefined();
            expect(validateString({ maxLength: 5 })('1123')).toBeUndefined();
            expect(validateString({ maxLength: 5 })('11234')).toBeUndefined();
        });
        it(`returns ${ValidateStringError.stringIsTooShort} when string is too short`, () => {
            expect(validateString({ minLength: 2 })('1')).toBe(ValidateStringError.stringIsTooShort);
        });
        it(`returns ${ValidateStringError.stringIsTooLong} when string is too short`, () => {
            expect(validateString({ maxLength: 2 })('123')).toBe(ValidateStringError.stringIsTooLong);
        });
    });
});
