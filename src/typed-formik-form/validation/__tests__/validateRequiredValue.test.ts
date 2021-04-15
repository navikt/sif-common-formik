import validateRequiredValue, { ValidateRequiredValueErrors } from '../validateRequiredValue';

describe(`validateRequiredValue`, () => {
    it(`returns undefined when the field has  value`, () => {
        expect(validateRequiredValue('1')).toBeUndefined();
        expect(validateRequiredValue(123)).toBeUndefined();
    });
    it(`returns ${ValidateRequiredValueErrors.noValue} when the field has no value`, () => {
        expect(validateRequiredValue(undefined)).toBe(ValidateRequiredValueErrors.noValue);
        expect(validateRequiredValue('')).toBe(ValidateRequiredValueErrors.noValue);
        expect(validateRequiredValue(null)).toBe(ValidateRequiredValueErrors.noValue);
    });
});
