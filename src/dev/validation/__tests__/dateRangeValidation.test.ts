import dateRangeValidation, { dateIsWithinRange } from '../dateRangeValidation';

const minDate: Date = new Date(2000, 1, 1);
const maxDate: Date = new Date(2000, 11, 1);
const earlyDate = new Date(1999, 1, 1);
const lateDate = new Date(2001, 1, 1);
const okDate = new Date(2000, 5, 5);

describe('dateRangeValidation', () => {
    describe('dateIsWithinRange', () => {
        it('returns false if date is before range', () => {
            expect(dateIsWithinRange(earlyDate, minDate, maxDate)).toBeFalsy();
        });
        it('returns false if date is after range', () => {
            expect(dateIsWithinRange(lateDate, minDate, maxDate)).toBeFalsy();
        });
        it('returns true if date is withing range', () => {
            expect(dateIsWithinRange(okDate, minDate, maxDate)).toBeTruthy();
            expect(dateIsWithinRange(minDate, minDate, maxDate)).toBeTruthy();
            expect(dateIsWithinRange(maxDate, minDate, maxDate)).toBeTruthy();
        });
    });
    describe('validateFromDate', () => {
        it('returns error if fromDate is before minDate', () => {
            expect(dateRangeValidation.validateFromDate(earlyDate, minDate, maxDate, undefined)).toBeDefined();
        });
        it('returns error if fromDate is after maxDate', () => {
            expect(dateRangeValidation.validateFromDate(lateDate, minDate, maxDate, undefined)).toBeDefined();
        });
        it('returns no error if fromDate is same as minDate', () => {
            expect(dateRangeValidation.validateFromDate(minDate, minDate, maxDate, undefined)).toBeUndefined();
        });
        it('returns no error if fromDate is same as maxDate', () => {
            expect(dateRangeValidation.validateFromDate(maxDate, minDate, maxDate, undefined)).toBeUndefined();
        });
        it('returns no error if fromDate is between minDate and maxData', () => {
            expect(dateRangeValidation.validateFromDate(okDate, minDate, maxDate, undefined)).toBeUndefined();
        });
    });
});
