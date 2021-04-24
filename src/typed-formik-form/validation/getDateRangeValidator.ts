import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import getDateValidator, { DateValidationOptions, DateValidationResult } from './getDateValidator';
import { ValidationFunction } from './types';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum ValidateDateRangeError {
    toDateIsBeforeFromDate = 'toDateIsBeforeFromDate',
    fromDateIsAfterToDate = 'fromDateIsAfterToDate',
}

type DateRangeValidationResult =
    | DateValidationResult
    | ValidateDateRangeError.fromDateIsAfterToDate
    | ValidateDateRangeError.toDateIsBeforeFromDate
    | undefined;

interface FromDateOptions extends DateValidationOptions {
    toDate?: Date;
}

interface ToDateOptions extends DateValidationOptions {
    fromDate?: Date;
}

const validateFromDate = (options: FromDateOptions): ValidationFunction<DateRangeValidationResult> => (value: any) => {
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
        return ValidateDateRangeError.fromDateIsAfterToDate;
    }
    return undefined;
};

const validateToDate = (options: ToDateOptions): ValidationFunction<DateRangeValidationResult> => (value: any) => {
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
        return ValidateDateRangeError.toDateIsBeforeFromDate;
    }
    return undefined;
};

const getDateRangeValidator = {
    validateFromDate,
    validateToDate,
};

export default getDateRangeValidator;
