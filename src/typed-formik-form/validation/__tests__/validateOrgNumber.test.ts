import validateOrgNumber, { ValidateOrgNumberErrors } from '../validateOrgNumber';

describe(`validateOrgNumber`, () => {
    it('returns undefined when the org number is valid', () => {
        expect(validateOrgNumber()('979312059')).toBeUndefined();
        expect(validateOrgNumber({ required: true })('979312059')).toBeUndefined();
    });
    it(`returns ${ValidateOrgNumberErrors.noValue} when value is empty`, () => {
        expect(validateOrgNumber({ required: true })('')).toBe(ValidateOrgNumberErrors.noValue);
    });
    it(`returns ${ValidateOrgNumberErrors.invalidFormat} when value exists and the orgNumber is not valid`, () => {
        expect(validateOrgNumber()('213')).toEqual(ValidateOrgNumberErrors.invalidFormat);
        expect(validateOrgNumber()(['979312059'])).toEqual(ValidateOrgNumberErrors.invalidFormat);
    });
});
