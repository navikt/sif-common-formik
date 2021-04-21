import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationFunction, ValidationError } from './types';
import getDateValidator, { DateValidationOptions, DateValidationResult, ValidateDateError } from './getDateValidator';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum ValidateDateInRangeError {
    toDateIsBeforeFromDate = 'toDateIsBeforeFromDate',
    fromDateIsAfterToDate = 'fromDateIsAfterToDate',
}

type DateRangeValidationResult =
    | DateValidationResult
    | ValidateDateInRangeError.fromDateIsAfterToDate
    | ValidateDateInRangeError.toDateIsBeforeFromDate
    | ValidationError;

interface FromDateOptions extends DateValidationOptions {
    toDate?: Date;
}

interface ToDateOptions extends DateValidationOptions {
    fromDate?: Date;
}

const validateFromDate = (
    options: FromDateOptions,
    customErrors?: {
        [ValidateRequiredFieldError.noValue]: ValidateRequiredFieldError.noValue | ValidationError;
        [ValidateDateError.invalidDateFormat]: ValidateDateError.invalidDateFormat | ValidationError;
        [ValidateDateError.dateAfterMax]: ValidateDateError.dateAfterMax | ValidationError;
        [ValidateDateError.dateBeforeMin]: ValidateDateError.dateBeforeMin | ValidationError;
        [ValidateDateInRangeError.fromDateIsAfterToDate]:
            | ValidateDateInRangeError.fromDateIsAfterToDate
            | ValidationError;
    }
): ValidationFunction<DateRangeValidationResult> => (value: any) => {
    const dateError = getDateValidator(options)(value);
    if (dateError) {
        return dateError;
    }
    const { toDate } = options;
    const date = datepickerUtils.getDateFromDateString(value);
    if (!date || !toDate) {
        return undefined;
    }

    if (dayjs(date).isAfter(toDate, 'day')) {
        return (
            (customErrors || {})[ValidateDateInRangeError.fromDateIsAfterToDate] ||
            ValidateDateInRangeError.fromDateIsAfterToDate
        );
    }
    return undefined;
};

const validateToDate = (
    options: ToDateOptions,
    customErrors?: {
        [ValidateRequiredFieldError.noValue]: ValidateRequiredFieldError.noValue | ValidationError;
        [ValidateDateError.invalidDateFormat]: ValidateDateError.invalidDateFormat | ValidationError;
        [ValidateDateError.dateAfterMax]: ValidateDateError.dateAfterMax | ValidationError;
        [ValidateDateError.dateBeforeMin]: ValidateDateError.dateBeforeMin | ValidationError;
        [ValidateDateInRangeError.toDateIsBeforeFromDate]:
            | ValidateDateInRangeError.toDateIsBeforeFromDate
            | ValidationError;
    }
): ValidationFunction<DateRangeValidationResult> => (value: any) => {
    const dateError = getDateValidator(options)(value);
    if (dateError) {
        return dateError;
    }
    const { fromDate } = options;
    const date = datepickerUtils.getDateFromDateString(value);
    if (!date || !fromDate) {
        return undefined;
    }
    if (dayjs(date).isBefore(fromDate, 'day')) {
        return (
            (customErrors || {})[ValidateDateInRangeError.toDateIsBeforeFromDate] ||
            ValidateDateInRangeError.toDateIsBeforeFromDate
        );
    }
    return undefined;
};

const getDateRangeValidator = {
    validateFromDate,
    validateToDate,
};

export default getDateRangeValidator;
