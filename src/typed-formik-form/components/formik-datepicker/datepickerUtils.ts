import moment from 'moment';
import { DatepickerLimitations, DatepickerDateRange, isISODateString } from 'nav-datovelger';
import { DatepickerLimitiations } from './FormikDatepicker';

const isoStringFormat = 'YYYY-MM-DD';

export const dateToISOString = (date?: Date) => (date ? moment(date).format(isoStringFormat) : '');
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
        if (moment(value, moment.ISO_8601, true).isValid()) {
            date = moment(value).toDate();
        }
    } else if (typeof value === 'object') {
        date = value;
    }
    return date ? dateToISOString(date) : undefined;
};

const getDateFromDateString = (dateString: string): Date | undefined => {
    if (isISODateString(dateString)) {
        return new Date(dateString);
    }
    return undefined;
};

const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    parseDateLimitations,
};

export default datepickerUtils;
