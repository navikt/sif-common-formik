import moment from 'moment';
import { DatepickerLimitations, DatepickerDateRange, isISODateString } from 'nav-datovelger';
import { DatepickerLimitiations } from './FormikDatepicker';

const apiDateFormat = 'YYYY-MM-DD';

const dateToISOFormattedDateString = (date: Date) => moment(date).format(apiDateFormat);

const parseDateLimitations = ({
    minDate,
    maxDate,
    disabledDateRanges = [],
    disableWeekend,
}: DatepickerLimitiations): DatepickerLimitations => {
    const invalidDateRanges: DatepickerDateRange[] = disabledDateRanges.map((d) => ({
        from: dateToISOFormattedDateString(d.from),
        to: dateToISOFormattedDateString(d.to),
    }));
    return {
        minDate: minDate ? dateToISOFormattedDateString(minDate) : undefined,
        maxDate: maxDate ? dateToISOFormattedDateString(maxDate) : undefined,
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
    return date ? dateToISOFormattedDateString(date) : undefined;
};

const getDateFromDateString = (dateString: string, isValidString: boolean): Date | string | undefined => {
    if (!isValidString) {
        return dateString;
    }
    return new Date(dateString);
};

const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    parseDateLimitations,
};

export default datepickerUtils;
