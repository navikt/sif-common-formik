import fnrvalidator from '@navikt/fnrvalidator';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { ValidationFunction } from './types';
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

export enum FieldHasValueErrors {
    'noValue' = 'noValue',
}

export const validateFieldHasValue: ValidationFunction<FieldHasValueErrors> = (value: any) => {
    return isFieldWithValue(value) === false ? FieldHasValueErrors.noValue : undefined;
};

export enum StringValueErrors {
    noValue = 'noValue',
    invalidType = 'invalidType',
    tooShort = 'tooShort',
    tooLong = 'tooLong',
}
export const validateStringValue = ({
    min,
    max,
}: {
    min?: number;
    max?: number;
}): ValidationFunction<StringValueErrors> => (value: any) => {
    if (!isFieldWithValue(value)) {
        return StringValueErrors.noValue;
    }
    if (typeof value !== 'string') {
        return StringValueErrors.invalidType;
    }
    if (min !== undefined && value.length < min) {
        return StringValueErrors.tooShort;
    }
    if (max !== undefined && value.length > max) {
        return StringValueErrors.tooLong;
    }
    return undefined;
};

export enum ListHasItemsErrors {
    listIsEmpty = 'listIsEmpty',
}
export const validateListHasItems: ValidationFunction<ListHasItemsErrors> = (value: any) => {
    return isArrayWithItems(value) ? undefined : ListHasItemsErrors.listIsEmpty;
};

export enum DateIsValidErrors {
    dateHasInvalidFormat = 'dateHasInvalidFormat',
}
export const validateDatePickerString: ValidationFunction<DateIsValidErrors> = (value: any) => {
    return isValidDatePickerDateString(value) ? undefined : DateIsValidErrors.dateHasInvalidFormat;
};

export enum YesOrNoIsAnsweredErrors {
    'yesOrNoUnanswered' = 'yesOrNoUnanswered',
}
export const validateYesOrNoIsAnswered: ValidationFunction<YesOrNoIsAnsweredErrors> = (value: any) => {
    return isAnswerdYesOrNo(value) ? undefined : YesOrNoIsAnsweredErrors.yesOrNoUnanswered;
};

export enum NumberIsValidErrors {
    'invalidNumber' = 'invalidNumber',
}
export const validateNumber: ValidationFunction<NumberIsValidErrors> = (value: any) => {
    return isValidNumber(value) ? undefined : NumberIsValidErrors.invalidNumber;
};

export enum NumberIsValidAndWithinRangeErrors {
    numberToSmall = 'numberToSmall',
    numberToLarge = 'numberToLarge',
}

export const validateNumberIsWithinRange = ({
    min,
    max,
}: {
    min?: number;
    max?: number;
}): ValidationFunction<NumberIsValidAndWithinRangeErrors | NumberIsValidErrors> => (value: any) => {
    const requiredNumberError = validateNumber(value);
    if (requiredNumberError) {
        return requiredNumberError;
    }
    if (min !== undefined && value < min) {
        return NumberIsValidAndWithinRangeErrors.numberToSmall;
    }
    if (max !== undefined && value > max) {
        return NumberIsValidAndWithinRangeErrors.numberToLarge;
    }
    return undefined;
};

export enum DateIsWithinRangeError {
    dateHasInvalidFormat = 'dateHasInvalidFormat',
    dateBeforeMin = 'dateBeforeMin',
    dateAfterMax = 'dateAfterMax',
}
export const validateDateIsWithinRange = ({
    min,
    max,
}: {
    min?: Date;
    max?: Date;
}): ValidationFunction<DateIsWithinRangeError> => (value: any) => {
    const date = datepickerUtils.getDateFromDateString(value);
    if (!date) {
        return DateIsWithinRangeError.dateHasInvalidFormat;
    }
    if (min && dayjs(date).isBefore(min, 'day')) {
        return DateIsWithinRangeError.dateBeforeMin;
    }
    if (max && dayjs(date).isAfter(max, 'day')) {
        return DateIsWithinRangeError.dateAfterMax;
    }
    return undefined;
};

export enum OrgNumberIsValidErrors {
    invalidNorwegianOrgNumber = 'invalidNorwegianOrgNumber',
}

export const validateOrgNumber: ValidationFunction<OrgNumberIsValidErrors> = (value: any) => {
    return isValidOrgNumber(value) ? undefined : OrgNumberIsValidErrors.invalidNorwegianOrgNumber;
};

export enum FødselsnummerIsValidErrors {
    fødselsnummerNot11Chars = 'fødselsnummerNot11Chars',
    fødselsnummerChecksumError = 'fødselsnummerChecksumError',
    invalidFødselsnummer = 'invalidFødselsnummer',
}
export const validateFødselsnummer: ValidationFunction<FødselsnummerIsValidErrors> = (value: any) => {
    /** Errors from @navikt/fnrvalidator */
    const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
    const CHECKSUM_ERROR = "checksums don't match";
    const result = fnrvalidator.fnr(value);
    if (result.status === 'invalid') {
        const { reasons } = result;
        if (reasons.includes(LENGTH_ERROR)) {
            return FødselsnummerIsValidErrors.fødselsnummerNot11Chars;
        }
        if (reasons.includes(CHECKSUM_ERROR)) {
            return FødselsnummerIsValidErrors.fødselsnummerChecksumError;
        }
        return FødselsnummerIsValidErrors.invalidFødselsnummer;
    }
    return undefined;
};
