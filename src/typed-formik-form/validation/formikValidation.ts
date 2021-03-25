import dayjs from 'dayjs';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { FormikValidateFunction as FormikValidationFunction } from '../types';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import fnrvalidator from '@navikt/fnrvalidator';
import {
    isAnswerdYesOrNo,
    isFieldWithValue,
    isValidArrayWithItems,
    isValidDatePickerDateString,
    isValidNumber,
    isValidOrgNumber,
} from './validation';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export enum FORMIK_VALIDATION_ERROR {
    'fieldHasNoValue' = 'fieldHasNoValue',
    'listIsEmpty' = 'listIsEmpty',
    'yesOrNoUnanswered' = 'yesOrNoUnanswered',
    'dateHasInvalidFormat' = 'dateHasInvalidFormat',
    'dateBeforeMin' = 'dateBeforeMin',
    'dateAfterMax' = 'dateAfterMax',
    'invalidNumber' = 'invalidNumber',
    'numberToSmall' = 'numberToSmall',
    'numberToLarge' = 'numberToLarge',
    'invalidNorwegianOrgNumber' = 'invalidNorwegianOrgNumber',
    'invalidFødselsnummer' = 'invalidFødselsnummer',
    'fødselsnummerNot11Chars' = 'fødselsnummerNot11Chars',
    'fødselsnummerChecksumError' = 'fødselsnummerChecksumError',
    'fødselsnummerDateError' = 'fødselsnummerDateError',
}

interface FormikValidationError {
    error: FORMIK_VALIDATION_ERROR;
    field?: string;
}

type FormikValidationResult = FormikValidationError | undefined;

const createValidationError = (error: FORMIK_VALIDATION_ERROR, field?: string): FormikValidationError => ({
    error,
    field,
});

const fieldHasValue: FormikValidationFunction = (value: any, field?: string): FormikValidationResult => {
    return !isFieldWithValue(value) ? createValidationError(FORMIK_VALIDATION_ERROR.fieldHasNoValue, field) : undefined;
};

const listHasItems: FormikValidationFunction = (value: any, field?: string): FormikValidationResult => {
    return isValidArrayWithItems(value) ? undefined : createValidationError(FORMIK_VALIDATION_ERROR.listIsEmpty, field);
};

const dateIsValid: FormikValidationFunction = (value: any, field?: string): FormikValidationResult => {
    return isValidDatePickerDateString(value)
        ? undefined
        : createValidationError(FORMIK_VALIDATION_ERROR.dateHasInvalidFormat, field);
};

const yesOrNoIsAnswered: FormikValidationFunction = (value: any, field?: string): FormikValidationResult => {
    return isAnswerdYesOrNo(value)
        ? undefined
        : createValidationError(FORMIK_VALIDATION_ERROR.yesOrNoUnanswered, field);
};

const numberIsValid: FormikValidationFunction = (value: any, field?: string): FormikValidationResult => {
    return isValidNumber(value) ? undefined : createValidationError(FORMIK_VALIDATION_ERROR.invalidNumber, field);
};

const numberIsWithinRange = ({ min, max }: { min?: number; max?: number }): FormikValidationFunction => (
    value: any,
    field?: string
): FormikValidationResult => {
    const requiredNumberError = numberIsValid(value, field);
    if (requiredNumberError) {
        return requiredNumberError;
    }
    if (min !== undefined && value < min) {
        return createValidationError(FORMIK_VALIDATION_ERROR.numberToSmall, field);
    }
    if (max !== undefined && value > max) {
        return createValidationError(FORMIK_VALIDATION_ERROR.numberToLarge, field);
    }
    return undefined;
};

const dateIsWithinRange = ({ min, max }: { min?: Date; max?: Date }): FormikValidationFunction => (
    value: any,
    field?: string
): FormikValidationResult => {
    const date = datepickerUtils.getDateFromDateString(value);
    if (!date) {
        return createValidationError(FORMIK_VALIDATION_ERROR.dateHasInvalidFormat, field);
    }
    if (min && dayjs(date).isBefore(min, 'day')) {
        return createValidationError(FORMIK_VALIDATION_ERROR.dateBeforeMin, field);
    }
    if (max && dayjs(date).isAfter(max, 'day')) {
        return createValidationError(FORMIK_VALIDATION_ERROR.dateAfterMax, field);
    }
    return undefined;
};

const orgNumberIsValid = (value: any, field?: string): FormikValidationResult => {
    return isValidOrgNumber(value)
        ? undefined
        : createValidationError(FORMIK_VALIDATION_ERROR.invalidNorwegianOrgNumber, field);
};

const fødselsnummerIsValid = (value: any, field?: string): FormikValidationResult => {
    /** Errors from @navikt/fnrvalidator */
    const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
    const CHECKSUM_ERROR = "checksums don't match";

    const result = fnrvalidator.fnr(value);

    if (result.status === 'invalid') {
        const { reasons } = result;
        if (reasons.includes(LENGTH_ERROR)) {
            return createValidationError(FORMIK_VALIDATION_ERROR.fødselsnummerNot11Chars, field);
        }
        if (reasons.includes(CHECKSUM_ERROR)) {
            return createValidationError(FORMIK_VALIDATION_ERROR.fødselsnummerChecksumError, field);
        }
        return createValidationError(FORMIK_VALIDATION_ERROR.invalidFødselsnummer, field);
    }
    return undefined;
};

const formikValidation = {
    fieldHasValue,
    listHasItems,
    yesOrNoIsAnswered,
    dateIsValid,
    dateIsWithinRange,
    numberIsValid,
    numberIsWithinRange,
    orgNumberIsValid,
    fødselsnummerIsValid,
};

export default formikValidation;
