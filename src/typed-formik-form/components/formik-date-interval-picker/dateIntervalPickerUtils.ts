import moment from 'moment';
import { DateRange } from '../../types';
import { DatepickerLimitiations } from '../formik-datepicker/FormikDatepicker';

const sortDateRange = (d1: DateRange, d2: DateRange): number => {
    if (moment(d1.from).isSameOrBefore(d2.from)) {
        return -1;
    }
    return 1;
};

const sortDateRangeByToDate = (d1: DateRange, d2: DateRange): number => {
    if (moment(d1.to).isSameOrBefore(d2.to)) {
        return -1;
    }
    return 1;
};
export const getRangesStartingAfterDate = (date: Date, dateRanges: DateRange[] = []): DateRange[] => {
    return dateRanges.filter((dateRange) => moment(dateRange.from).isAfter(date, 'day'));
};

export const getRangesEndingBeforeDate = (date: Date, dateRanges: DateRange[] = []): DateRange[] => {
    return dateRanges.filter((dateRange) => moment(dateRange.to).isBefore(date, 'day'));
};

export const findClosestDateAfterDate = (fromDate: Date, dates: Date[]): Date | undefined => {
    const moments = dates.map((d) => moment(d)).filter((m) => m.isAfter(fromDate, 'day'));
    return moments.length > 0 ? moment.min(moments).toDate() : undefined;
};

export const findClosestDateBeforeDate = (fromDate: Date, dates: Date[]): Date | undefined => {
    const moments = dates.map((d) => moment(d)).filter((m) => m.isBefore(fromDate, 'day'));
    const maxDate = moments.length > 0 ? moment.max(moments).toDate() : undefined;
    return maxDate;
};

export const findClosestDateBeforeOrEqualDate = (fromDate: Date, dates: Date[]): Date | undefined => {
    const moments = dates.map((d) => moment(d)).filter((m) => m.isSameOrBefore(fromDate, 'day'));
    const maxDate = moments.length > 0 ? moment.max(moments).toDate() : undefined;
    return maxDate;
};

export const getClosestDateRangeBeforeDate = (date: Date, ranges: DateRange[]): DateRange | undefined => {
    const rangesBeforeDate = getRangesEndingBeforeDate(date, ranges).sort(sortDateRangeByToDate).reverse();
    return rangesBeforeDate.length === 0 ? undefined : rangesBeforeDate[0];
};

export const getClosestDateRangeAfterDate = (date: Date, ranges: DateRange[]): DateRange | undefined => {
    const rangesAfterDate = getRangesStartingAfterDate(date, ranges).sort(sortDateRange);
    return rangesAfterDate.length === 0 ? undefined : rangesAfterDate[0];
};

export const getMaxDateForRangeStart = ({
    fromDate,
    toDate,
    maxDate,
    otherRanges: dateRanges = [],
}: {
    fromDate?: Date;
    toDate?: Date;
    maxDate?: Date;
    otherRanges?: DateRange[];
}): Date | undefined => {
    if (!fromDate) {
        return maxDate;
    }
    const followingRanges = getRangesStartingAfterDate(fromDate, dateRanges).sort(sortDateRange);
    const dates: Date[] = [
        ...(toDate ? [toDate] : []),
        ...(maxDate ? [maxDate] : []),
        ...(followingRanges.length > 0 ? [moment(followingRanges[0].from).subtract(1, 'day').toDate()] : []),
    ];
    return findClosestDateAfterDate(fromDate, dates);
};
export const getMaxDateForRangeEnd = ({
    fromDate,
    toDate,
    maxDate,
    dateRanges = [],
}: {
    fromDate?: Date;
    toDate?: Date;
    maxDate?: Date;
    dateRanges?: DateRange[];
}): Date | undefined => {
    const baseDate = fromDate || toDate;
    if (!baseDate) {
        return maxDate;
    }
    const follwingDateRange = getClosestDateRangeAfterDate(baseDate, dateRanges);
    const dates: Date[] = [
        ...(maxDate ? [maxDate] : []),
        ...(follwingDateRange ? [moment(follwingDateRange.from).subtract(1, 'day').toDate()] : []),
    ];
    return findClosestDateAfterDate(baseDate, dates);
};

export const getMinDateForRangeStart = ({
    toDate,
    minDate,
    dateRanges = [],
}: {
    toDate?: Date;
    minDate?: Date;
    dateRanges?: DateRange[];
}): Date | undefined => {
    if (!toDate) {
        return minDate;
    }
    const preceedingDateRange = getClosestDateRangeBeforeDate(toDate, dateRanges);
    const dates: Date[] = [
        ...(minDate ? [minDate] : []),
        ...(preceedingDateRange ? [moment(preceedingDateRange.to).add(1, 'day').toDate()] : []),
    ];
    return findClosestDateBeforeDate(toDate, dates);
};

export const getMinDateForRangeEnd = ({
    fromDate,
    toDate,
    minDate,
    dateRanges: otherRanges = [],
}: {
    fromDate?: Date;
    toDate?: Date;
    minDate?: Date;
    dateRanges?: DateRange[];
}): Date | undefined => {
    const baseDate = fromDate || toDate;
    if (!baseDate) {
        return minDate;
    }
    const preceedingDateRange = getClosestDateRangeBeforeDate(baseDate, otherRanges);
    const dates: Date[] = [
        ...(fromDate ? [fromDate] : []),
        ...(minDate ? [minDate] : []),
        ...(preceedingDateRange ? [moment(preceedingDateRange.to).add(1, 'day').toDate()] : []),
    ];
    return findClosestDateBeforeOrEqualDate(baseDate, dates);
};

interface DateIntervalDateLimitations {
    fromDateLimitations: DatepickerLimitiations;
    toDateLimitations: DatepickerLimitiations;
}

export const getDateLimitationsForDateIntervalPicker = (props: {
    fromDate?: Date;
    toDate?: Date;
    minDate: Date;
    maxDate: Date;
    dateRanges?: DateRange[];
}): DateIntervalDateLimitations => {
    return {
        fromDateLimitations: {
            minDate: getMinDateForRangeStart(props),
            maxDate: getMaxDateForRangeStart(props),
            disabledDateRanges: props.dateRanges,
        },
        toDateLimitations: {
            minDate: getMinDateForRangeEnd(props),
            maxDate: getMaxDateForRangeEnd(props),
            disabledDateRanges: props.dateRanges,
        },
    };
};
