import moment from 'moment';
import { DatovelgerAvgrensninger, Tidsperiode } from 'nav-datovelger';
import { DatepickerLimitiations } from './FormikDatepicker';

const apiDateFormat = 'YYYY-MM-DD';

const dateToISOFormattedDateString = (date: Date) => moment(date).format(apiDateFormat);

const parseDateLimitations = ({
    minDate,
    maxDate,
    disabledDateRanges = [],
    disableWeekend,
}: DatepickerLimitiations): DatovelgerAvgrensninger => {
    const ugyldigeTidsperioder: Tidsperiode[] = disabledDateRanges.map((d) => ({
        fom: dateToISOFormattedDateString(d.from),
        tom: dateToISOFormattedDateString(d.to),
    }));
    return {
        minDato: minDate ? dateToISOFormattedDateString(minDate) : undefined,
        maksDato: maxDate ? dateToISOFormattedDateString(maxDate) : undefined,
        helgedagerIkkeTillatt: disableWeekend,
        ugyldigeTidsperioder,
    };
};

const getDateStringFromValue = (value?: Date | string): string | undefined => {
    let date;
    if (value && typeof value === 'string') {
        if (moment(value, moment.ISO_8601, true).isValid()) {
            date = moment(value).toDate();
        }
    } else if (typeof value === 'object') {
        date = value;
    }
    return date ? dateToISOFormattedDateString(date) : undefined;
};

const getDateFromDateString = (dateString: string): Date | undefined =>
    dateString && dateString !== 'Invalid date' ? new Date(dateString) : undefined;

const datepickerUtils = {
    getDateStringFromValue,
    getDateFromDateString,
    parseDateLimitations,
};

export default datepickerUtils;
