import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationFunction } from './types';
import validateDate, { DateValidationOptions, DateValidationResult } from './validateDate';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum ValidateDateInRangeError {
    toDateIsBeforeFromDate = 'toDateIsBeforeFromDate',
    fromDateIsAfterToDate = 'fromDateIsAfterToDate',
}

type DateRangeValidationResult =
    | DateValidationResult
    | ValidateDateInRangeError.fromDateIsAfterToDate
    | ValidateDateInRangeError.toDateIsBeforeFromDate;

interface FromDateOptions extends DateValidationOptions {
    toDate?: Date;
}

interface ToDateOptions extends DateValidationOptions {
    fromDate?: Date;
}

const validateFromDate = (options: FromDateOptions): ValidationFunction<DateRangeValidationResult> => (value: any) => {
    const error = validateDate(options)(value);
    if (error) {
        return error;
    }
    const { toDate } = options;
    const date = datepickerUtils.getDateFromDateString(value);
    if (!date || !toDate) {
        return undefined;
    }
    return dayjs(date).isAfter(toDate, 'day') ? ValidateDateInRangeError.fromDateIsAfterToDate : undefined;
};

const validateToDate = (options: ToDateOptions): ValidationFunction<DateRangeValidationResult> => (value: any) => {
    const error = validateDate(options)(value);
    if (error) {
        return error;
    }
    const { fromDate } = options;
    const date = datepickerUtils.getDateFromDateString(value);
    if (!date || !fromDate) {
        return undefined;
    }
    if (dayjs(date).isBefore(fromDate, 'day')) {
        return ValidateDateInRangeError.toDateIsBeforeFromDate;
    }
    return undefined;
};

const dateRangeValidation = {
    validateFromDate,
    validateToDate,
};

export default dateRangeValidation;
