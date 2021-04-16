import { ISOStringToDate } from '../../components/formik-datepicker/datepickerUtils';
import validateDate, { ValidateDateError } from '../validateDate';
import { ValidateRequiredValueError } from '../validateRequiredValue';

describe(`validateDate`, () => {
    it(`returns undefined when date is valid`, () => {
        expect(validateDate()(`2020-10-10`)).toBeUndefined();
    });
    it(`returns undefined when date empty and not required`, () => {
        expect(validateDate()(``)).toBeUndefined();
    });
    it(`returns ${ValidateRequiredValueError.noValue} when required and value is empty`, () => {
        expect(validateDate({ required: true })(``)).toBe(ValidateRequiredValueError.noValue);
    });
    it(`returns ${ValidateDateError.invalidDateFormat} when value has invalid format`, () => {
        expect(validateDate()(`asd`)).toBe(ValidateDateError.invalidDateFormat);
    });
    it(`returns ${ValidateDateError.invalidDateFormat} when value has invalid format`, () => {
        expect(validateDate()(`asd`)).toBe(ValidateDateError.invalidDateFormat);
        expect(validateDate({ required: true })(`asd`)).toBe(ValidateDateError.invalidDateFormat);
    });
    describe('date ranges', () => {
        const min = ISOStringToDate('2020-10-10');
        const max = ISOStringToDate('2020-10-20');
        it(`returns ${ValidateDateError.dateBeforeMin} when date is before min date`, () => {
            expect(validateDate({ min })(`2020-10-01`)).toBe(ValidateDateError.dateBeforeMin);
        });
        it(`returns undefined when date is same or after min date`, () => {
            expect(validateDate({ min })('2020-10-10')).toBeUndefined();
            expect(validateDate({ min })('2020-10-11')).toBeUndefined();
        });
        it(`returns ${ValidateDateError.dateAfterMax} when date is afte max date`, () => {
            expect(validateDate({ max })(`2020-10-21`)).toBe(ValidateDateError.dateAfterMax);
            expect(validateDate({ min, max })(`2020-10-21`)).toBe(ValidateDateError.dateAfterMax);
        });
        it(`returns undefined when date is same or after min date`, () => {
            expect(validateDate({ max })('2020-10-20')).toBeUndefined();
            expect(validateDate({ max })('2020-10-19')).toBeUndefined();
            expect(validateDate({ min, max })('2020-10-19')).toBeUndefined();
        });
    });
});
