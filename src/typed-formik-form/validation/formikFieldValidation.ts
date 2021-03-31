import fnrvalidator from '@navikt/fnrvalidator';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { FormikValidationError, FormikValidationFunction, FormikValidationResult } from './types';
import {
    isAnswerdYesOrNo,
    isFieldWithValue,
    isArrayWithItems,
    isValidDatePickerDateString,
    isValidNumber,
    isValidOrgNumber,
} from './validation';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export type FieldHasValueErrors = { noValue: FormikValidationError };
const fieldHasValue: FormikValidationFunction<FieldHasValueErrors> = (
    value: any,
    errors: FieldHasValueErrors
): FormikValidationResult => {
    return !isFieldWithValue(value) ? errors.noValue : undefined;
};

export type EmptyListErrors = { listIsEmpty: FormikValidationResult };
const listHasItems: FormikValidationFunction<EmptyListErrors> = (
    value: any,
    errors: EmptyListErrors
): FormikValidationResult => {
    return isArrayWithItems(value) ? undefined : errors.listIsEmpty;
};

export type DateIsValidErrors = { dateHasInvalidFormat: FormikValidationError };
const dateIsValid: FormikValidationFunction<DateIsValidErrors> = (
    value: any,
    errors: DateIsValidErrors
): FormikValidationResult => {
    return isValidDatePickerDateString(value) ? undefined : errors.dateHasInvalidFormat;
};

export type YesOrNoIsAnsweredErrors = { yesOrNoUnanswered: FormikValidationError };
const yesOrNoIsAnswered: FormikValidationFunction<YesOrNoIsAnsweredErrors> = (
    value: any,
    errors: YesOrNoIsAnsweredErrors
): FormikValidationResult => {
    return isAnswerdYesOrNo(value) ? undefined : errors.yesOrNoUnanswered;
};

export type NumberIsValidErrors = { invalidNumber: FormikValidationError };
const numberIsValid: FormikValidationFunction<NumberIsValidErrors> = (
    value: any,
    error: NumberIsValidErrors
): FormikValidationResult => {
    return isValidNumber(value) ? undefined : error.invalidNumber;
};

export type NumberIsValidAndWithinRangeErrors = {
    invalidNumber: FormikValidationError;
    numberToSmall: FormikValidationError;
    numberToLarge: FormikValidationError;
};
const numberIsValidAndWithinRange = ({
    min,
    max,
}: {
    min?: number;
    max?: number;
}): FormikValidationFunction<NumberIsValidAndWithinRangeErrors> => (
    value: any,
    error: NumberIsValidAndWithinRangeErrors
): FormikValidationResult => {
    const requiredNumberError = numberIsValid(value, { invalidNumber: error.invalidNumber });
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
    dateHasInvalidFormat: FormikValidationError;
    dateBeforeMin: FormikValidationError;
    dateAfterMax: FormikValidationError;
};
const dateIsWithinRange = ({
    min,
    max,
}: {
    min?: Date;
    max?: Date;
}): FormikValidationFunction<DateIsWithinRangeError> => (
    value: any,
    error: DateIsWithinRangeError
): FormikValidationResult => {
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
    invalidNorwegianOrgNumber: FormikValidationError;
};

const orgNumberIsValid: FormikValidationFunction<OrgNumberIsValidErrors> = (
    value: any,
    error: OrgNumberIsValidErrors
): FormikValidationResult => {
    return isValidOrgNumber(value) ? undefined : error.invalidNorwegianOrgNumber;
};

export type FødselsnummerIsValidErrors = {
    fødselsnummerNot11Chars: FormikValidationError;
    fødselsnummerChecksumError: FormikValidationError;
    invalidFødselsnummer: FormikValidationError;
};
const fødselsnummerIsValid: FormikValidationFunction<FødselsnummerIsValidErrors> = (
    value: any,
    error: FødselsnummerIsValidErrors
): FormikValidationResult => {
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

const formikFieldValidation = {
    fieldHasValue,
    listHasItems,
    yesOrNoIsAnswered,
    dateIsValid,
    dateIsWithinRange,
    numberIsValid,
    numberIsValidAndWithinRange,
    orgNumberIsValid,
    fødselsnummerIsValid,
};

export default formikFieldValidation;
