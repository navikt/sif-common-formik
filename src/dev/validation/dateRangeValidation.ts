import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { FieldValidationResult } from '../../typed-formik-form/types/fieldValidation';
import { prettifyDateExtended } from '../utils/dateUtils';

export const dateIsWithinRange = (date: Date, minDate: Date, maxDate: Date): boolean => {
    dayjs.extend(isBetween);
    return dayjs(date).isBetween(minDate, maxDate, 'day', '[]');
};

const validateDateInRange = (date: Date | undefined, minDate: Date, maxDate: Date) => {
    if (date === undefined) {
        return {
            key: 'dataRangeValidation.form.validation.required',
        };
    }
    if (!dateIsWithinRange(date, minDate, maxDate)) {
        return {
            key: 'dataRangeValidation.form.validation.dateOutsideRange',
            values: {
                fom: prettifyDateExtended(minDate),
                tom: prettifyDateExtended(maxDate),
            },
        };
    }
    return undefined;
};

const validateFromDate = (
    date: Date | undefined,
    minDate: Date,
    maxDate: Date,
    toDate?: Date
): FieldValidationResult => {
    const error = validateDateInRange(date, minDate, maxDate);
    if (error !== undefined) {
        return error;
    }
    if (toDate && dayjs(date).isAfter(toDate, 'day')) {
        return {
            key: 'dataRangeValidation.form.validation.fromDateAfterToDate',
        };
    }
    return undefined;
};

const validateToDate = (date: Date | undefined, minDate: Date, maxDate: Date, fromDate?: Date) => {
    const error = validateDateInRange(date, minDate, maxDate);
    if (error !== undefined) {
        return error;
    }
    if (fromDate && dayjs(date).isBefore(fromDate, 'day')) {
        return {
            key: 'dataRangeValidation.form.validation.toDateBeforeFromDate',
        };
    }
    return undefined;
};

const dateRangeValidation = {
    validateToDate,
    validateFromDate,
};

export default dateRangeValidation;
