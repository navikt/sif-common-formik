import validateNumber, { ValidateNumberErrors } from '../validateNumber';

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
    it(`returns ${ValidateNumberErrors.noValue} when value is required and value is empty, undefined or null`, () => {
        expect(validateNumber({ required: true })('')).toEqual(ValidateNumberErrors.noValue);
    });
    it(`returns ${ValidateNumberErrors.invalidFormat} when hasValue and value has invalid format`, () => {
        expect(validateNumber()('1.2.3')).toEqual(ValidateNumberErrors.invalidFormat);
        expect(validateNumber()([1])).toEqual(ValidateNumberErrors.invalidFormat);
    });
    it(`returns ${ValidateNumberErrors.tooSmall} if number is valid and too small`, () => {
        expect(validateNumber({ min: 2 })('1')).toEqual(ValidateNumberErrors.tooSmall);
        expect(validateNumber({ min: 2 })('1,9')).toEqual(ValidateNumberErrors.tooSmall);
    });
    it(`returns undefined if number is not too small`, () => {
        expect(validateNumber({ min: 2 })('2')).toBeUndefined();
        expect(validateNumber({ min: 2 })('2,3')).toBeUndefined();
        expect(validateNumber({ min: 2 })(2.3)).toBeUndefined();
    });
    it(`returns ${ValidateNumberErrors.tooLarge} if number is valid and too small`, () => {
        expect(validateNumber({ max: 2 })('2.1')).toEqual(ValidateNumberErrors.tooLarge);
        expect(validateNumber({ max: 2 })('3')).toEqual(ValidateNumberErrors.tooLarge);
        expect(validateNumber({ max: 2 })(3)).toEqual(ValidateNumberErrors.tooLarge);
    });
    it(`returns undefined if number is not too small`, () => {
        expect(validateNumber({ max: 2 })('2')).toBeUndefined();
        expect(validateNumber({ max: 2 })('1,3')).toBeUndefined();
        expect(validateNumber({ max: 2 })(1.3)).toBeUndefined();
    });
});
