import moment from 'moment';
import { DatovelgerAvgrensninger } from 'nav-datovelger';
import { dateToISOFormattedDateString } from '../../../utils/dateUtils';
import { DateLimitiations } from './FormikDatepicker';

const parseDateLimitations = (dateLimitations: DateLimitiations): DatovelgerAvgrensninger => {
    return {
        maksDato: dateToISOFormattedDateString(dateLimitations.maksDato),
        minDato: dateToISOFormattedDateString(dateLimitations.minDato),
        helgedagerIkkeTillatt: dateLimitations.helgedagerIkkeTillatt,
        ugyldigeTidsperioder:
            dateLimitations.ugyldigeTidsperioder &&
            dateLimitations.ugyldigeTidsperioder.map((t: { fom: Date; tom: Date }) => ({
                fom: dateToISOFormattedDateString(t.fom)!,
                tom: dateToISOFormattedDateString(t.tom)!
            }))
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
    parseDateLimitations
};

export default datepickerUtils;
