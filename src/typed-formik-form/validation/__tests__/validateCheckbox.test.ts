import validateChecked, { ValidateCheckedError } from '../validateChecked';

describe(`validateChecked`, () => {
    it(`returns undefined when value is ${true}`, () => {
        expect(validateChecked(true)).toBeUndefined();
    });
    it(`returns ${ValidateCheckedError.notChecked} when value is other than ${true}`, () => {
        expect(validateChecked(undefined)).toBe(ValidateCheckedError.notChecked);
        expect(validateChecked('')).toBe(ValidateCheckedError.notChecked);
        expect(validateChecked(null)).toBe(ValidateCheckedError.notChecked);
        expect(validateChecked(123)).toBe(ValidateCheckedError.notChecked);
        expect(validateChecked([])).toBe(ValidateCheckedError.notChecked);
    });
});
