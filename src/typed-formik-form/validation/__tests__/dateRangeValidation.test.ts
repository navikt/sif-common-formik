import dateRangeValidation, { ValidateDateInRangeError } from '../dateRangeValidation';
import { ValidateRequiredValueError } from '../validateRequiredValue';

describe('dateRangeValidation', () => {
    it('runs', () => {
        expect(1).toBeDefined();
    });
    describe('validateFromDate', () => {
        it('returns undefined if date is undefined', () => {
            expect(dateRangeValidation.validateFromDate({})(undefined)).toBeUndefined();
        });
        it('returns undefined if toDate is undefined', () => {
            expect(dateRangeValidation.validateFromDate({})('2020-10-10')).toBeUndefined();
        });
        it(`returns ${ValidateDateInRangeError.fromDateIsAfterToDate} if toDate is undefined`, () => {
            expect(dateRangeValidation.validateFromDate({ toDate: new Date('2020-10-09') })('2020-10-10')).toBe(
                ValidateDateInRangeError.fromDateIsAfterToDate
            );
        });
        it(`returns ${ValidateRequiredValueError.noValue} if required and date is is undefined`, () => {
            expect(dateRangeValidation.validateFromDate({ required: true })('')).toBe(
                ValidateRequiredValueError.noValue
            );
        });
    });
    describe('validateToDate', () => {
        it('returns undefined if date is undefined', () => {
            expect(dateRangeValidation.validateToDate({})(undefined)).toBeUndefined();
        });
        it('returns undefined if date is undefined', () => {
            expect(dateRangeValidation.validateToDate({})(undefined)).toBeUndefined();
        });
        it('returns undefined if toDate is undefined', () => {
            expect(dateRangeValidation.validateToDate({})('2020-10-10')).toBeUndefined();
        });
        it(`returns ${ValidateDateInRangeError.fromDateIsAfterToDate} if toDate is undefined`, () => {
            expect(dateRangeValidation.validateToDate({ fromDate: new Date('2020-10-11') })('2020-10-10')).toBe(
                ValidateDateInRangeError.toDateIsBeforeFromDate
            );
        });
        it(`returns ${ValidateRequiredValueError.noValue} if required and date is is undefined`, () => {
            expect(dateRangeValidation.validateToDate({ required: true })('')).toBe(ValidateRequiredValueError.noValue);
        });
    });
});
