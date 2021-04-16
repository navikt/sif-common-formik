import { ISOStringToDate } from '../../components/formik-datepicker/datepickerUtils';
import validateDate, { ValidateDateErrors } from '../validateDate';

describe(`validateDate`, () => {
    it(`returns undefined when date is valid`, () => {
        expect(validateDate()(`2020-10-10`)).toBeUndefined();
    });
    it(`returns undefined when date empty and not required`, () => {
        expect(validateDate()(``)).toBeUndefined();
    });
    it(`returns ${ValidateDateErrors.noValue} when required and value is empty`, () => {
        expect(validateDate({ required: true })(``)).toBe(ValidateDateErrors.noValue);
    });
    it(`returns ${ValidateDateErrors.invalidFormat} when value has invalid format`, () => {
        expect(validateDate()(`asd`)).toBe(ValidateDateErrors.invalidFormat);
    });
    it(`returns ${ValidateDateErrors.invalidFormat} when value has invalid format`, () => {
        expect(validateDate()(`asd`)).toBe(ValidateDateErrors.invalidFormat);
        expect(validateDate({ required: true })(`asd`)).toBe(ValidateDateErrors.invalidFormat);
    });
    describe('date ranges', () => {
        const min = ISOStringToDate('2020-10-10');
        const max = ISOStringToDate('2020-10-20');
        it(`returns ${ValidateDateErrors.dateBeforeMin} when date is before min date`, () => {
            expect(validateDate({ min })(`2020-10-01`)).toBe(ValidateDateErrors.dateBeforeMin);
        });
        it(`returns undefined when date is same or after min date`, () => {
            expect(validateDate({ min })('2020-10-10')).toBeUndefined();
            expect(validateDate({ min })('2020-10-11')).toBeUndefined();
        });
        it(`returns ${ValidateDateErrors.dateAfterMax} when date is afte max date`, () => {
            expect(validateDate({ max })(`2020-10-21`)).toBe(ValidateDateErrors.dateAfterMax);
            expect(validateDate({ min, max })(`2020-10-21`)).toBe(ValidateDateErrors.dateAfterMax);
        });
        it(`returns undefined when date is same or after min date`, () => {
            expect(validateDate({ max })('2020-10-20')).toBeUndefined();
            expect(validateDate({ max })('2020-10-19')).toBeUndefined();
            expect(validateDate({ min, max })('2020-10-19')).toBeUndefined();
        });
    });
});
