/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    getRangesStartingAfterDate,
    findClosestDateAfterDate,
    getMaxDateForRangeStart,
    findClosestDateBeforeDate,
    getRangesEndingBeforeDate,
    getMinDateForRangeStart,
    getMinDateForRangeEnd,
    getMaxDateForRangeEnd,
} from '../dateIntervalPickerUtils';
import { apiStringDateToDate, DateRange, formatDateToApiFormat } from '@navikt/sif-common-core/lib/utils/dateUtils';

const dateRanges: DateRange[] = [
    {
        from: apiStringDateToDate('2020-03-14'),
        to: apiStringDateToDate('2020-03-16'),
    },
    {
        from: apiStringDateToDate('2020-01-01'),
        to: apiStringDateToDate('2020-01-05'),
    },
    {
        from: apiStringDateToDate('2020-02-01'),
        to: apiStringDateToDate('2020-02-05'),
    },
    {
        from: apiStringDateToDate('2020-03-01'),
        to: apiStringDateToDate('2020-03-05'),
    },
    {
        from: apiStringDateToDate('2020-04-01'),
        to: apiStringDateToDate('2020-04-05'),
    },
];

describe('dateIntervalPickerUtils', () => {
    describe('getRangesStartingAfterDate', () => {
        it('returns correct ranges after spesific date', () => {
            const fromDate = apiStringDateToDate('2020-02-02');
            const ranges = getRangesStartingAfterDate(fromDate, dateRanges);
            expect(ranges.length).toBe(3);
            expect(formatDateToApiFormat(ranges[0].from)).toEqual('2020-03-14');
            expect(formatDateToApiFormat(ranges[1].from)).toEqual('2020-03-01');
            expect(formatDateToApiFormat(ranges[2].from)).toEqual('2020-04-01');
        });
        it('returns empty array if no ranges are after date', () => {
            const fromDate = apiStringDateToDate('2020-05-02');
            const ranges = getRangesStartingAfterDate(fromDate, dateRanges);
            expect(ranges.length).toBe(0);
        });
    });
    describe('getRangesEndingBeforeDate', () => {
        it('returns correct ranges ending before spesified date', () => {
            const fromDate = apiStringDateToDate('2020-03-13');
            const ranges = getRangesEndingBeforeDate(fromDate, dateRanges);
            expect(ranges.length).toBe(3);
            expect(formatDateToApiFormat(ranges[0].to)).toEqual('2020-01-05');
            expect(formatDateToApiFormat(ranges[1].to)).toEqual('2020-02-05');
            expect(formatDateToApiFormat(ranges[2].to)).toEqual('2020-03-05');
        });
        it('returns empty array if no ranges are after date', () => {
            const fromDate = apiStringDateToDate('2020-01-01');
            const ranges = getRangesEndingBeforeDate(fromDate, dateRanges);
            expect(ranges.length).toBe(0);
        });
    });
    describe('findFirstDateAfterDate', () => {
        it('returns first date in dates, after spesified date', () => {
            const dates = dateRanges.map((d) => d.from);
            const date = apiStringDateToDate('2020-02-08');
            const result = findClosestDateAfterDate(date, dates);
            expect(result).toBeDefined();
            expect(formatDateToApiFormat(result!)).toEqual('2020-03-01');
        });
        it('returns undefined if no dates are after spesified date', () => {
            const dates = dateRanges.map((d) => d.to);
            const date = apiStringDateToDate('2020-07-08');
            const result = findClosestDateAfterDate(date, dates);
            expect(result).toBeUndefined();
        });
    });

    describe('findFirstDateBeforeDate', () => {
        it('returns first date in dates, before spesified date', () => {
            const dates = dateRanges.map((d) => d.from);
            const date = apiStringDateToDate('2020-03-13');
            const result = findClosestDateBeforeDate(date, dates);
            expect(result).toBeDefined();
            expect(formatDateToApiFormat(result!)).toEqual('2020-03-01');
        });
        it('returns undefined if no dates are before spesified date', () => {
            const dates = dateRanges.map((d) => d.to);
            const date = apiStringDateToDate('2020-01-01');
            const result = findClosestDateBeforeDate(date, dates);
            expect(result).toBeUndefined();
        });
    });

    describe('getMinDateForRangeStart', () => {
        const toDate = apiStringDateToDate('2020-03-10');
        const minDate = apiStringDateToDate('2019-12-12');

        it('returns minDate if toDate are undefined', () => {
            const result = getMinDateForRangeStart({
                toDate: undefined,
                minDate,
                dateRanges,
            })!;
            expect(formatDateToApiFormat(result)).toEqual('2019-12-12');
        });
        it('returns minDate if toDate is defined and no other ranges are set', () => {
            const result = getMinDateForRangeStart({
                toDate,
                minDate,
                dateRanges: [],
            })!;
            expect(formatDateToApiFormat(result)).toEqual('2019-12-12');
        });
        it('returns first available date if there are ranges between toDate and minDate', () => {
            const result = getMinDateForRangeStart({
                toDate,
                minDate,
                dateRanges,
            })!;
            expect(formatDateToApiFormat(result)).toEqual('2020-03-06');
        });
    });

    describe('getMaxDateForRangeStart', () => {
        const fromDate = apiStringDateToDate('2020-02-08');
        const maxDate = apiStringDateToDate('2020-10-10');
        const toDate = apiStringDateToDate('2020-08-10');

        it('returns undefined if no data is set', () => {
            const result = getMaxDateForRangeStart({
                fromDate: undefined,
                toDate: undefined,
                maxDate: undefined,
                otherRanges: [],
            });
            expect(result).toBeUndefined();
        });

        it('returns maxDate if no other dates are defined', () => {
            const result = getMaxDateForRangeStart({
                fromDate,
                maxDate,
                toDate: undefined,
                otherRanges: undefined,
            });
            expect(formatDateToApiFormat(result!)).toEqual('2020-10-10');
        });

        it('returns toDate if it is the closest following date', () => {
            const result = getMaxDateForRangeStart({
                fromDate,
                maxDate,
                toDate,
            });
            expect(formatDateToApiFormat(result!)).toEqual('2020-08-10');
        });

        it('returns last available date from before following dateRanges', () => {
            const result = getMaxDateForRangeStart({
                fromDate,
                maxDate,
                toDate,
                otherRanges: dateRanges,
            });
            expect(formatDateToApiFormat(result!)).toEqual('2020-02-29');
        });
    });

    describe('getMinDateForRangeEnd', () => {
        const fromDate = apiStringDateToDate('2020-02-08');
        const minDate = apiStringDateToDate('2019-12-12');

        it('returns undefined if no data is set', () => {
            expect(getMinDateForRangeEnd({})).toBeUndefined();
        });

        it('returns minDate if no startDate is set', () => {
            const result = getMinDateForRangeEnd({ minDate })!;
            expect(formatDateToApiFormat(result)).toEqual('2019-12-12');
        });

        it('returns fromDate if no startDate is set', () => {
            const result = getMinDateForRangeEnd({ minDate, fromDate })!;
            expect(formatDateToApiFormat(result)).toEqual('2020-02-08');
        });
    });

    describe('getMaxDateForRangeEnd', () => {
        const fromDate = apiStringDateToDate('2020-02-08');
        const maxDate = apiStringDateToDate('2020-10-10');

        it('returns undefined if no data or only fromDate is set', () => {
            expect(getMaxDateForRangeEnd({})).toBeUndefined();
            expect(getMaxDateForRangeEnd({ fromDate })).toBeUndefined();
        });
        it('returns maxDate if only fromDate and maxDate is set', () => {
            const result = getMaxDateForRangeEnd({ fromDate, maxDate })!;
            expect(formatDateToApiFormat(result)).toEqual('2020-10-10');
        });
        it('returns day before following dateRange it range exists', () => {
            const result = getMaxDateForRangeEnd({ fromDate, maxDate, dateRanges })!;
            expect(formatDateToApiFormat(result)).toEqual('2020-02-29');
        });
    });
});
