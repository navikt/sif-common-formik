import getDateRangeValidator, { ValidateDateRangeError } from '../getDateRangeValidator';
import { ValidateRequiredFieldError } from '../getRequiredFieldValidator';

describe('dateRangeValidation', () => {
    it('runs', () => {
        expect(1).toBeDefined();
    });
    describe('validateFromDate', () => {
        it('returns undefined if date is undefined', () => {
            expect(getDateRangeValidator.validateFromDate({})(undefined)).toBeUndefined();
        });
        it('returns undefined if toDate is undefined', () => {
            expect(getDateRangeValidator.validateFromDate({})('2020-10-10')).toBeUndefined();
        });
        it(`returns ${ValidateDateRangeError.fromDateIsAfterToDate} if toDate is undefined`, () => {
            expect(getDateRangeValidator.validateFromDate({ toDate: new Date('2020-10-09') })('2020-10-10')).toBe(
                ValidateDateRangeError.fromDateIsAfterToDate
            );
        });
        it(`returns ${ValidateRequiredFieldError.noValue} if required and date is is undefined`, () => {
            expect(getDateRangeValidator.validateFromDate({ required: true })('')).toBe(
                ValidateRequiredFieldError.noValue
            );
        });
    });
    describe('validateToDate', () => {
        it('returns undefined if date is undefined', () => {
            expect(getDateRangeValidator.validateToDate({})(undefined)).toBeUndefined();
        });
        it('returns undefined if date is undefined', () => {
            expect(getDateRangeValidator.validateToDate({})(undefined)).toBeUndefined();
        });
        it('returns undefined if toDate is undefined', () => {
            expect(getDateRangeValidator.validateToDate({})('2020-10-10')).toBeUndefined();
        });
        it(`returns ${ValidateDateRangeError.fromDateIsAfterToDate} if toDate is undefined`, () => {
            expect(getDateRangeValidator.validateToDate({ fromDate: new Date('2020-10-11') })('2020-10-10')).toBe(
                ValidateDateRangeError.toDateIsBeforeFromDate
            );
        });
        it(`returns ${ValidateRequiredFieldError.noValue} if required and date is is undefined`, () => {
            expect(getDateRangeValidator.validateToDate({ required: true })('')).toBe(
                ValidateRequiredFieldError.noValue
            );
        });
    });
});
