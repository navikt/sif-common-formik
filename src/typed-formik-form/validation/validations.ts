import fnrvalidator from '@navikt/fnrvalidator';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationError, ValidationFunction, ValidationResult } from './types';
import validationUtils from './validationUtils';

const {
    isAnswerdYesOrNo,
    isArrayWithItems,
    isFieldWithValue,
    isValidDatePickerDateString,
    isValidNumber,
    isValidOrgNumber,
} = validationUtils;

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export type FieldHasValueErrors = { noValue: ValidationError };
export const validateFieldHasValue: ValidationFunction<FieldHasValueErrors> = (
    value: any,
    errors: FieldHasValueErrors
): ValidationResult => {
    return !isFieldWithValue(value) ? errors.noValue : undefined;
};

export type StringValueErrors = {
    noValue: ValidationError;
    invalidType: ValidationError;
    tooShort: ValidationError;
    tooLong: ValidationError;
};
export const validateStringValue = ({
    min,
    max,
}: {
    min?: number;
    max?: number;
}): ValidationFunction<StringValueErrors> => (value: any, errors: StringValueErrors): ValidationResult => {
    if (!isFieldWithValue(value)) {
        return errors.noValue;
    }
    if (typeof value !== 'string') {
        return errors.invalidType;
    }
    if (min !== undefined && value.length < min) {
        return errors.tooShort;
    }
    if (max !== undefined && value.length > max) {
        return errors.tooLong;
    }
    return undefined;
};

export type EmptyListErrors = { listIsEmpty: ValidationResult };
export const validateListHasItems: ValidationFunction<EmptyListErrors> = (
    value: any,
    errors: EmptyListErrors
): ValidationResult => {
    return isArrayWithItems(value) ? undefined : errors.listIsEmpty;
};

export type DateIsValidErrors = { dateHasInvalidFormat: ValidationError };
export const validateDatePickerString: ValidationFunction<DateIsValidErrors> = (
    value: any,
    errors: DateIsValidErrors
): ValidationResult => {
    return isValidDatePickerDateString(value) ? undefined : errors.dateHasInvalidFormat;
};

export type YesOrNoIsAnsweredErrors = { yesOrNoUnanswered: ValidationError };
export const validateYesOrNoIsAnswered: ValidationFunction<YesOrNoIsAnsweredErrors> = (
    value: any,
    errors: YesOrNoIsAnsweredErrors
): ValidationResult => {
    return isAnswerdYesOrNo(value) ? undefined : errors.yesOrNoUnanswered;
};

export type NumberIsValidErrors = { invalidNumber: ValidationError };
export const validateNumber: ValidationFunction<NumberIsValidErrors> = (
    value: any,
    error: NumberIsValidErrors
): ValidationResult => {
    return isValidNumber(value) ? undefined : error.invalidNumber;
};

export type NumberIsValidAndWithinRangeErrors = {
    invalidNumber: ValidationError;
    numberToSmall: ValidationError;
    numberToLarge: ValidationError;
};
export const validateNumberIsWithinRange = ({
    min,
    max,
}: {
    min?: number;
    max?: number;
}): ValidationFunction<NumberIsValidAndWithinRangeErrors> => (
    value: any,
    error: NumberIsValidAndWithinRangeErrors
): ValidationResult => {
    const requiredNumberError = validateNumber(value, { invalidNumber: error.invalidNumber });
    if (requiredNumberError) {
        return requiredNumberError;
    }
    if (min !== undefined && value < min) {
        return error.numberToSmall;
    }
    if (max !== undefined && value > max) {
        return error.numberToLarge;
    }
    return undefined;
};

export type DateIsWithinRangeError = {
    dateHasInvalidFormat: ValidationError;
    dateBeforeMin: ValidationError;
    dateAfterMax: ValidationError;
};
export const validateDateIsWithinRange = ({
    min,
    max,
}: {
    min?: Date;
    max?: Date;
}): ValidationFunction<DateIsWithinRangeError> => (value: any, error: DateIsWithinRangeError): ValidationResult => {
    const date = datepickerUtils.getDateFromDateString(value);
    if (!date) {
        return error.dateHasInvalidFormat;
    }
    if (min && dayjs(date).isBefore(min, 'day')) {
        return error.dateBeforeMin;
    }
    if (max && dayjs(date).isAfter(max, 'day')) {
        return error.dateAfterMax;
    }
    return undefined;
};

export type OrgNumberIsValidErrors = {
    invalidNorwegianOrgNumber: ValidationError;
};

export const validateOrgNumber: ValidationFunction<OrgNumberIsValidErrors> = (
    value: any,
    error: OrgNumberIsValidErrors
): ValidationResult => {
    return isValidOrgNumber(value) ? undefined : error.invalidNorwegianOrgNumber;
};

export type FødselsnummerIsValidErrors = {
    fødselsnummerNot11Chars: ValidationError;
    fødselsnummerChecksumError: ValidationError;
    invalidFødselsnummer: ValidationError;
};
export const validateFødselsnummer: ValidationFunction<FødselsnummerIsValidErrors> = (
    value: any,
    error: FødselsnummerIsValidErrors
): ValidationResult => {
    /** Errors from @navikt/fnrvalidator */
    const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
    const CHECKSUM_ERROR = "checksums don't match";
    const result = fnrvalidator.fnr(value);
    if (result.status === 'invalid') {
        const { reasons } = result;
        if (reasons.includes(LENGTH_ERROR)) {
            return error.fødselsnummerNot11Chars;
        }
        if (reasons.includes(CHECKSUM_ERROR)) {
            return error.fødselsnummerChecksumError;
        }
        return error.invalidFødselsnummer;
    }
    return undefined;
};
