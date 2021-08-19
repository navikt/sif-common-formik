import dayjs from 'dayjs';
import { DatepickerLimitations, DatepickerDateRange, isISODateString } from 'nav-datovelger';
import { DatepickerLimitiations } from './FormikDatepicker';

const isoStringFormat = 'YYYY-MM-DD';

export const dateToISOString = (date?: Date) => (date ? dayjs(date).format(isoStringFormat) : '');
export const ISOStringToDate = (dateString = ''): Date | undefined => getDateFromDateString(dateString);

const parseDateLimitations = ({
    minDate,
    maxDate,
    disabledDateRanges = [],
    disableWeekend,
}: DatepickerLimitiations): DatepickerLimitations => {
    const invalidDateRanges: DatepickerDateRange[] = disabledDateRanges.map((d) => ({
        from: dateToISOString(d.from),
        to: dateToISOString(d.to),
    }));
    return {
        minDate: minDate ? dateToISOString(minDate) : undefined,
        maxDate: maxDate ? dateToISOString(maxDate) : undefined,
        weekendsNotSelectable: disableWeekend,
        invalidDateRanges,
    };
};

const getDateStringFromValue = (value?: Date | string): string | undefined => {
    let date;
    if (value && typeof value === 'string') {
        if (isISODateString(value) === false) {
            return value;
        }
        if (dayjs(value, isoStringFormat, true).isValid()) {
            date = dayjs(value).toDate();
        }
    } else if (typeof value === 'object') {
        date = value;
    }
    return date ? dateToISOString(date) : undefined;
};

const getDateFromDateString = (dateString: string | undefined): Date | undefined => {
    if (dateString === undefined) {
        return undefined;
    }
    if (isISODateString(dateString)) {
        return new Date(dateString);
    }
    return undefined;
};

/** Check if dateString has format DD.MM.YYYY, or D.M.YY */
const isValidFormattedDateString = (dateString = ''): boolean => {
    return /\d{1,2}.\d{1,2}.(\d{2}|\d{4})$/.test(dateString);
};

const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    parseDateLimitations,
    isValidFormattedDateString,
};

export default datepickerUtils;
