import validateRequiredValue, { ValidateRequiredValueError } from '../validateRequiredValue';

describe(`validateRequiredValue`, () => {
    it(`returns undefined when the field has  value`, () => {
        expect(validateRequiredValue('1')).toBeUndefined();
        expect(validateRequiredValue(123)).toBeUndefined();
    });
    it(`returns ${ValidateRequiredValueError.noValue} when the field has no value`, () => {
        expect(validateRequiredValue(undefined)).toBe(ValidateRequiredValueError.noValue);
        expect(validateRequiredValue('')).toBe(ValidateRequiredValueError.noValue);
        expect(validateRequiredValue(null)).toBe(ValidateRequiredValueError.noValue);
    });
});
