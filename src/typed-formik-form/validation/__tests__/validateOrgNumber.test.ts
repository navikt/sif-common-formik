import getOrgNumberValidator, { ValidateOrgNumberError } from '../getOrgNumberValidator';
import { ValidateRequiredFieldError } from '../getRequiredFieldValidator';

describe(`validateOrgNumber`, () => {
    it('returns undefined when the org number is valid', () => {
        expect(getOrgNumberValidator()('979312059')).toBeUndefined();
        expect(getOrgNumberValidator({ required: true })('979312059')).toBeUndefined();
    });
    it(`returns ${ValidateRequiredFieldError.noValue} when value is empty`, () => {
        expect(getOrgNumberValidator({ required: true })('')).toBe(ValidateRequiredFieldError.noValue);
    });
    it(`returns ${ValidateOrgNumberError.invalidOrgNumberFormat} when value exists and the orgNumber is not valid`, () => {
        expect(getOrgNumberValidator()('213')).toEqual(ValidateOrgNumberError.invalidOrgNumberFormat);
        expect(getOrgNumberValidator()(['979312059'])).toEqual(ValidateOrgNumberError.invalidOrgNumberFormat);
    });
});
