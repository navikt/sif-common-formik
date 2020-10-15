import moment from 'moment';
import { DatepickerLimitations, DatepickerDateRange, isISODateString } from 'nav-datovelger';
import { DatepickerLimitiations, FormikDatepickerValue } from './FormikDatepicker';

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

const getDateFromDateString = (dateString: string): Date | undefined => {
    if (isISODateString(dateString)) {
        return new Date(dateString);
    }
    return undefined;
};

const isDate = (input: any): input is Date => {
    return typeof input === 'object' && Object.prototype.toString.call(input) === '[object Date]' ? true : false;
};

export const createFormiDatepickerValue = (value: string | Date | undefined): FormikDatepickerValue => {
    let date: Date | undefined;
    let dateString = '';
    let dateStringIsValid = false;

    if (isDate(value)) {
        date = value;
        dateString = dateToISOFormattedDateString(value);
        dateStringIsValid = true;
    }
    if (typeof value === 'string') {
        date = getDateFromDateString(value);
        dateString = date ? dateToISOFormattedDateString(date) : value;
        dateStringIsValid = date !== undefined;
    }
    return {
        date,
        dateString,
        dateStringIsValid,
    };
};

const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    parseDateLimitations,
};

export default datepickerUtils;
