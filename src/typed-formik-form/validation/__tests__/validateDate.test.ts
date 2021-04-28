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
    describe('only weekdays', () => {
        const monday = '2020-02-17';
        const tuesday = '2020-02-18';
        const wednesday = '2020-02-19';
        const thursday = '2020-02-20';
        const friday = '2020-02-21';
        const saturday = '2020-02-22';
        const sunday = '2020-02-23';
        it(`returns ${undefined} when date is a monday`, () => {
            expect(getDateValidator({ onlyWeekdays: true })(monday)).toBe(undefined);
        });
        it(`returns ${undefined} when date is a tuesday`, () => {
            expect(getDateValidator({ onlyWeekdays: true })(tuesday)).toBe(undefined);
        });
        it(`returns ${undefined} when date is a wednesday`, () => {
            expect(getDateValidator({ onlyWeekdays: true })(wednesday)).toBe(undefined);
        });
        it(`returns ${undefined} when date is a thursday`, () => {
            expect(getDateValidator({ onlyWeekdays: true })(thursday)).toBe(undefined);
        });
        it(`returns ${undefined} when date is a friday`, () => {
            expect(getDateValidator({ onlyWeekdays: true })(friday)).toBe(undefined);
        });
        it(`returns ${ValidateDateError.dateNotWeekday} when date is a saturday`, () => {
            expect(getDateValidator({ onlyWeekdays: true })(saturday)).toBe(ValidateDateError.dateNotWeekday);
        });
        it(`returns ${ValidateDateError.dateNotWeekday} when date is a sunday`, () => {
            expect(getDateValidator({ onlyWeekdays: true })(sunday)).toBe(ValidateDateError.dateNotWeekday);
        });
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
