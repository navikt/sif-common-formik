import getCheckedValidator, { ValidateCheckedError } from '../getCheckedValidator';

describe(`validateChecked`, () => {
    it(`returns undefined when value is ${true}`, () => {
        expect(getCheckedValidator()(true)).toBeUndefined();
    });
    it(`returns ${ValidateCheckedError.notChecked} when value is other than ${true}`, () => {
        expect(getCheckedValidator()(undefined)).toBe(ValidateCheckedError.notChecked);
        expect(getCheckedValidator()('')).toBe(ValidateCheckedError.notChecked);
        expect(getCheckedValidator()(null)).toBe(ValidateCheckedError.notChecked);
        expect(getCheckedValidator()(123)).toBe(ValidateCheckedError.notChecked);
        expect(getCheckedValidator()([])).toBe(ValidateCheckedError.notChecked);
    });
});
