import { ISOStringToDate } from '../../components/formik-datepicker/datepickerUtils';
import getDateValidator, { ValidateDateError } from '../getDateValidator';
import { ValidateRequiredFieldError } from '../getRequiredFieldValidator';

describe(`validateDate`, () => {
    it(`returns undefined when date is valid`, () => {
        expect(getDateValidator()(`2020-10-10`)).toBeUndefined();
    });
    it(`returns undefined when date empty and not required`, () => {
        expect(getDateValidator()(``)).toBeUndefined();
    });
    it(`returns ${ValidateRequiredFieldError.noValue} when required and value is empty`, () => {
        expect(getDateValidator({ required: true })(``)).toBe(ValidateRequiredFieldError.noValue);
    });
    it(`returns ${ValidateDateError.invalidDateFormat} when value has invalid format`, () => {
        expect(getDateValidator()(`asd`)).toBe(ValidateDateError.invalidDateFormat);
    });
    it(`returns ${ValidateDateError.invalidDateFormat} when value has invalid format`, () => {
        expect(getDateValidator()(`asd`)).toBe(ValidateDateError.invalidDateFormat);
        expect(getDateValidator({ required: true })(`asd`)).toBe(ValidateDateError.invalidDateFormat);
    });
    describe('date ranges', () => {
        const min = ISOStringToDate('2020-10-10');
        const max = ISOStringToDate('2020-10-20');
        it(`returns ${ValidateDateError.dateBeforeMin} when date is before min date`, () => {
            expect(getDateValidator({ min })(`2020-10-01`)).toBe(ValidateDateError.dateBeforeMin);
        });
        it(`returns undefined when date is same or after min date`, () => {
            expect(getDateValidator({ min })('2020-10-10')).toBeUndefined();
            expect(getDateValidator({ min })('2020-10-11')).toBeUndefined();
        });
        it(`returns ${ValidateDateError.dateAfterMax} when date is afte max date`, () => {
            expect(getDateValidator({ max })(`2020-10-21`)).toBe(ValidateDateError.dateAfterMax);
            expect(getDateValidator({ min, max })(`2020-10-21`)).toBe(ValidateDateError.dateAfterMax);
        });
        it(`returns undefined when date is same or after min date`, () => {
            expect(getDateValidator({ max })('2020-10-20')).toBeUndefined();
            expect(getDateValidator({ max })('2020-10-19')).toBeUndefined();
            expect(getDateValidator({ min, max })('2020-10-19')).toBeUndefined();
        });
    });
});
