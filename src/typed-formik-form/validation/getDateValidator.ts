import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { getRequiredFieldValidator } from '.';
import { ValidationFunction } from './types';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';
import { hasValue } from './validationUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

export enum ValidateDateError {
    invalidDateFormat = 'invalidDateFormat',
    dateBeforeMin = 'dateBeforeMin',
    dateAfterMax = 'dateAfterMax',
    dateNotWeekday = 'dateNotWeekday',
}

export type DateValidationResult =
    | ValidateRequiredFieldError.noValue
    | ValidateDateError.invalidDateFormat
    | ValidateDateError.dateBeforeMin
    | ValidateDateError.dateAfterMax
    | ValidateDateError.dateNotWeekday
    | undefined;

export interface DateValidationOptions {
    required?: boolean;
    min?: Date;
    max?: Date;
    onlyWeekdays?: boolean;
}

const getDateValidator = (options: DateValidationOptions = {}): ValidationFunction<DateValidationResult> => (
    value: any
) => {
    const { required, min, max, onlyWeekdays } = options;
    const date = datepickerUtils.getDateFromDateString(value);
    if (required) {
        const err = getRequiredFieldValidator()(value);
        if (err) {
            return err;
        }
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
        if (onlyWeekdays && dayjs(date).isoWeekday() > 5) {
            return ValidateDateError.dateNotWeekday;
        }
    }
    return undefined;
};

export default getDateValidator;
