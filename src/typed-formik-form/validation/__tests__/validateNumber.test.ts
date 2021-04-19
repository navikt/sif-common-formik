import getNumberValidator, { ValidateNumberError } from '../getNumberValidator';
import { ValidateRequiredFieldError } from '../getRequiredFieldValidator';

describe(`validateNumber`, () => {
    it(`returns undefined when not required and value is empty`, () => {
        expect(getNumberValidator({ required: false })('')).toBeUndefined();
    });
    it('returns undefined when value is a valid number or number string', () => {
        expect(getNumberValidator()('1')).toBeUndefined();
        expect(getNumberValidator()('1.2')).toBeUndefined();
        expect(getNumberValidator()('1,2')).toBeUndefined();
        expect(getNumberValidator()('-1')).toBeUndefined();
        expect(getNumberValidator()(1)).toBeUndefined();
        expect(getNumberValidator()(2)).toBeUndefined();
    });
    it(`returns ${ValidateRequiredFieldError.noValue} when value is required and value is empty, undefined or null`, () => {
        expect(getNumberValidator({ required: true })('')).toEqual(ValidateRequiredFieldError.noValue);
    });
    it(`returns ${ValidateNumberError.invalidNumberFormat} when hasValue and value has invalid format`, () => {
        expect(getNumberValidator()('1.2.3')).toEqual(ValidateNumberError.invalidNumberFormat);
        expect(getNumberValidator()([1])).toEqual(ValidateNumberError.invalidNumberFormat);
    });
    it(`returns ${ValidateNumberError.numberIsTooSmall} if number is valid and too small`, () => {
        expect(getNumberValidator({ min: 2 })('1')).toEqual(ValidateNumberError.numberIsTooSmall);
        expect(getNumberValidator({ min: 2 })('1,9')).toEqual(ValidateNumberError.numberIsTooSmall);
    });
    it(`returns undefined if number is not too small`, () => {
        expect(getNumberValidator({ min: 2 })('2')).toBeUndefined();
        expect(getNumberValidator({ min: 2 })('2,3')).toBeUndefined();
        expect(getNumberValidator({ min: 2 })(2.3)).toBeUndefined();
    });
    it(`returns ${ValidateNumberError.numberIsTooLarge} if number is valid and too small`, () => {
        expect(getNumberValidator({ max: 2 })('2.1')).toEqual(ValidateNumberError.numberIsTooLarge);
        expect(getNumberValidator({ max: 2 })('3')).toEqual(ValidateNumberError.numberIsTooLarge);
        expect(getNumberValidator({ max: 2 })(3)).toEqual(ValidateNumberError.numberIsTooLarge);
    });
    it(`returns undefined if number is not too small`, () => {
        expect(getNumberValidator({ max: 2 })('2')).toBeUndefined();
        expect(getNumberValidator({ max: 2 })('1,3')).toBeUndefined();
        expect(getNumberValidator({ max: 2 })(1.3)).toBeUndefined();
    });
});
