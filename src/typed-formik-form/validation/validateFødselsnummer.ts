import fnrvalidator from '@navikt/fnrvalidator';
import { ValidationFunction } from './types';
import { hasValue } from './utils/hasValue';

export enum ValidateFødselsnummerErrors {
    noValue = 'validateFødselsnummer.noValue',
    fødselsnummerNot11Chars = 'validateFødselsnummer.fødselsnummerNot11Chars',
    fødselsnummerChecksumError = 'validateFødselsnummer.fødselsnummerChecksumError',
    invalidFødselsnummer = 'validateFødselsnummer.invalidFødselsnummer',
    disallowedFødselsnummer = 'validateFødselsnummer.fødselsnummerInConflict',
}

interface Options {
    required?: boolean;
    disallowedValues?: string[];
}

const validateFødselsnummer = (options: Options = {}): ValidationFunction<ValidateFødselsnummerErrors> => (
    value: any
) => {
    const { required, disallowedValues } = options;
    if (hasValue(value) === false && required === false) {
        return undefined;
    }
    if (hasValue(value) === false && required) {
        return ValidateFødselsnummerErrors.noValue;
    }
    if (hasValue(value)) {
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
        if (disallowedValues) {
            const hasConflict = disallowedValues.some((f) => f === value);
            if (hasConflict) {
                return ValidateFødselsnummerErrors.disallowedFødselsnummer;
            }
        }
    }
    return undefined;
};

export default validateFødselsnummer;
