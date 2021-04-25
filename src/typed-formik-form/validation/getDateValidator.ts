import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { getRequiredFieldValidator } from '.';
import { ValidationFunction } from './types';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';
import { hasValue } from './validationUtils';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum ValidateDateError {
    invalidDateFormat = 'invalidDateFormat',
    dateBeforeMin = 'dateBeforeMin',
    dateAfterMax = 'dateAfterMax',
}

export type DateValidationResult =
    | ValidateRequiredFieldError.noValue
    | ValidateDateError.invalidDateFormat
    | ValidateDateError.dateBeforeMin
    | ValidateDateError.dateAfterMax
    | undefined;

export interface DateValidationOptions {
    required?: boolean;
    min?: Date;
    max?: Date;
}

const getDateValidator = (options: DateValidationOptions = {}): ValidationFunction<DateValidationResult> => (
    value: any
) => {
    const { required, min, max } = options;
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
    }
    return undefined;
};

export default getDateValidator;
