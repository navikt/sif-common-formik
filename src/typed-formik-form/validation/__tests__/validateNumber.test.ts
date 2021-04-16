import validateNumber, { ValidateNumberError } from '../validateNumber';
import { ValidateRequiredValueError } from '../validateRequiredValue';

describe(`validateNumber`, () => {
    it(`returns undefined when not required and value is empty`, () => {
        expect(validateNumber({ required: false })('')).toBeUndefined();
    });
    it('returns undefined when value is a valid number or number string', () => {
        expect(validateNumber()('1')).toBeUndefined();
        expect(validateNumber()('1.2')).toBeUndefined();
        expect(validateNumber()('1,2')).toBeUndefined();
        expect(validateNumber()('-1')).toBeUndefined();
        expect(validateNumber()(1)).toBeUndefined();
        expect(validateNumber()(2)).toBeUndefined();
    });
    it(`returns ${ValidateRequiredValueError.noValue} when value is required and value is empty, undefined or null`, () => {
        expect(validateNumber({ required: true })('')).toEqual(ValidateRequiredValueError.noValue);
    });
    it(`returns ${ValidateNumberError.invalidNumberFormat} when hasValue and value has invalid format`, () => {
        expect(validateNumber()('1.2.3')).toEqual(ValidateNumberError.invalidNumberFormat);
        expect(validateNumber()([1])).toEqual(ValidateNumberError.invalidNumberFormat);
    });
    it(`returns ${ValidateNumberError.numberIsTooSmall} if number is valid and too small`, () => {
        expect(validateNumber({ min: 2 })('1')).toEqual(ValidateNumberError.numberIsTooSmall);
        expect(validateNumber({ min: 2 })('1,9')).toEqual(ValidateNumberError.numberIsTooSmall);
    });
    it(`returns undefined if number is not too small`, () => {
        expect(validateNumber({ min: 2 })('2')).toBeUndefined();
        expect(validateNumber({ min: 2 })('2,3')).toBeUndefined();
        expect(validateNumber({ min: 2 })(2.3)).toBeUndefined();
    });
    it(`returns ${ValidateNumberError.numberIsTooLarge} if number is valid and too small`, () => {
        expect(validateNumber({ max: 2 })('2.1')).toEqual(ValidateNumberError.numberIsTooLarge);
        expect(validateNumber({ max: 2 })('3')).toEqual(ValidateNumberError.numberIsTooLarge);
        expect(validateNumber({ max: 2 })(3)).toEqual(ValidateNumberError.numberIsTooLarge);
    });
    it(`returns undefined if number is not too small`, () => {
        expect(validateNumber({ max: 2 })('2')).toBeUndefined();
        expect(validateNumber({ max: 2 })('1,3')).toBeUndefined();
        expect(validateNumber({ max: 2 })(1.3)).toBeUndefined();
    });
});
