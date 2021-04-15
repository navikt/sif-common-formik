import fnrvalidator from '@navikt/fnrvalidator';
import { ValidationFunction } from './types';
import { hasValue } from './utils/hasValue';

export enum ValidateFødselsnummerErrors {
    noValue = 'noValue',
    fødselsnummerNot11Chars = 'fødselsnummerNot11Chars',
    fødselsnummerChecksumError = 'fødselsnummerChecksumError',
    invalidFødselsnummer = 'invalidFødselsnummer',
}

interface Options {
    required?: boolean;
}

const validateFødselsnummer = (options: Options = {}): ValidationFunction<ValidateFødselsnummerErrors> => (
    value: any
) => {
    const { required } = options;
    if (hasValue(value) === false && required) {
        return ValidateFødselsnummerErrors.noValue;
    }

    const result = fnrvalidator.fnr(value);
    if (result.status === 'invalid') {
        /** Errors from @navikt/fnrvalidator */
        const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
        const CHECKSUM_ERROR = "checksums don't match";
        const { reasons } = result;
        if (reasons.includes(LENGTH_ERROR)) {
            return ValidateFødselsnummerErrors.fødselsnummerNot11Chars;
        }
        if (reasons.includes(CHECKSUM_ERROR)) {
            return ValidateFødselsnummerErrors.fødselsnummerChecksumError;
        }
        return ValidateFødselsnummerErrors.invalidFødselsnummer;
    }
    return undefined;
};

export default validateFødselsnummer;
