import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationFunction } from './types';
import { hasValue } from './utils/hasValue';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum ValidateDateErrors {
    noValue = 'noValue',
    invalidFormat = 'invalidFormat',
    dateBeforeMin = 'dateBeforeMin',
    dateAfterMax = 'dateAfterMax',
}

interface Options {
    required?: boolean;
    min?: Date;
    max?: Date;
}
const validateDate = (options: Options = {}): ValidationFunction<ValidateDateErrors> => (value: any) => {
    const { required, min, max } = options;
    const date = datepickerUtils.getDateFromDateString(value);

    if (hasValue(value) === false && required) {
        return ValidateDateErrors.noValue;
    }
    if (hasValue(value)) {
        if (date === undefined) {
            return ValidateDateErrors.invalidFormat;
        }
        if (min && dayjs(date).isBefore(min, 'day')) {
            return ValidateDateErrors.dateBeforeMin;
        }
        if (max && dayjs(date).isAfter(max, 'day')) {
            return ValidateDateErrors.dateAfterMax;
        }
    }
    return undefined;
};

export default validateDate;
