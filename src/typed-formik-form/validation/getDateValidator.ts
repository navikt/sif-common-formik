import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationFunction, ValidationErrorRenderFunc } from './types';
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
    | ValidationErrorRenderFunc
    | undefined;

type Errors = {
    [ValidateRequiredFieldError.noValue]?: ValidateRequiredFieldError.noValue | ValidationErrorRenderFunc;
    [ValidateDateError.invalidDateFormat]?: ValidateDateError.invalidDateFormat | ValidationErrorRenderFunc;
    [ValidateDateError.dateBeforeMin]?: ValidateDateError.dateBeforeMin | ValidationErrorRenderFunc;
    [ValidateDateError.dateAfterMax]?: ValidateDateError.dateAfterMax | ValidationErrorRenderFunc;
};

const defaultErrors: Errors = {
    noValue: ValidateRequiredFieldError.noValue,
    invalidDateFormat: ValidateDateError.invalidDateFormat,
    dateBeforeMin: ValidateDateError.dateBeforeMin,
    dateAfterMax: ValidateDateError.dateAfterMax,
};

export interface DateValidationOptions {
    required?: boolean;
    min?: Date;
    max?: Date;
}

const getDateValidator = (
    options: DateValidationOptions = {},
    customErrors?: Errors
): ValidationFunction<DateValidationResult> => (value: any): DateValidationResult => {
    const { required, min, max } = options;
    const date = datepickerUtils.getDateFromDateString(value);
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };

    if (hasValue(value) === false && required) {
        return errors[ValidateRequiredFieldError.noValue];
    }
    if (hasValue(value)) {
        if (date === undefined) {
            return errors[ValidateDateError.invalidDateFormat];
        }
        if (min && dayjs(date).isBefore(min, 'day')) {
            return errors[ValidateDateError.dateBeforeMin];
        }
        if (max && dayjs(date).isAfter(max, 'day')) {
            return errors[ValidateDateError.dateAfterMax];
        }
    }
    return undefined;
};

export default getDateValidator;
