import validateOrgNumber, { ValidateOrgNumberError } from '../validateOrgNumber';
import { ValidateRequiredValueError } from '../validateRequiredValue';

describe(`validateOrgNumber`, () => {
    it('returns undefined when the org number is valid', () => {
        expect(validateOrgNumber()('979312059')).toBeUndefined();
        expect(validateOrgNumber({ required: true })('979312059')).toBeUndefined();
    });
    it(`returns ${ValidateRequiredValueError.noValue} when value is empty`, () => {
        expect(validateOrgNumber({ required: true })('')).toBe(ValidateRequiredValueError.noValue);
    });
    it(`returns ${ValidateOrgNumberError.invalidOrgNumberFormat} when value exists and the orgNumber is not valid`, () => {
        expect(validateOrgNumber()('213')).toEqual(ValidateOrgNumberError.invalidOrgNumberFormat);
        expect(validateOrgNumber()(['979312059'])).toEqual(ValidateOrgNumberError.invalidOrgNumberFormat);
    });
});
