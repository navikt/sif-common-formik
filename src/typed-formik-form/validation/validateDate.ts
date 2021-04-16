import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationFunction } from './types';
import { ValidateRequiredValueError } from './validateRequiredValue';
import { hasValue } from './validationUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum ValidateDateError {
    invalidDateFormat = 'invalidDateFormat',
    dateBeforeMin = 'dateBeforeMin',
    dateAfterMax = 'dateAfterMax',
}

type DateValidationResult =
    | ValidateRequiredValueError.noValue
    | ValidateDateError.invalidDateFormat
    | ValidateDateError.dateBeforeMin
    | ValidateDateError.dateAfterMax
    | undefined;

interface Options {
    required?: boolean;
    min?: Date;
    max?: Date;
}
const validateDate = (options: Options = {}): ValidationFunction<DateValidationResult> => (
    value: any
): DateValidationResult => {
    const { required, min, max } = options;
    const date = datepickerUtils.getDateFromDateString(value);

    if (hasValue(value) === false && required) {
        return ValidateRequiredValueError.noValue;
    }
    if (hasValue(value)) {
        if (date === undefined) {
            return ValidateDateError.invalidDateFormat;
        }
        if (min && dayjs(date).isBefore(min, 'day')) {
            return ValidateDateError.dateBeforeMin;
        }
        if (max && dayjs(date).isAfter(max, 'day')) {
            return ValidateDateError.dateAfterMax;
        }
    }
    return undefined;
};

export default validateDate;
