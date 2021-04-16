import fnrvalidator from '@navikt/fnrvalidator';
import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredValueError } from './validateRequiredValue';

export enum ValidateFødselsnummerError {
    fødselsnummerNot11Chars = 'fødselsnummerNot11Chars',
    fødselsnummerChecksumError = 'fødselsnummerChecksumError',
    invalidFødselsnummer = 'invalidFødselsnummer',
    disallowedFødselsnummer = 'fødselsnummerInConflict',
}

type FødselsnummerValidationResult =
    | ValidateRequiredValueError.noValue
    | ValidateFødselsnummerError.disallowedFødselsnummer
    | ValidateFødselsnummerError.fødselsnummerChecksumError
    | ValidateFødselsnummerError.fødselsnummerNot11Chars
    | ValidateFødselsnummerError.invalidFødselsnummer
    | undefined;

interface Options {
    required?: boolean;
    disallowedValues?: string[];
}

const validateFødselsnummer = (options: Options = {}): ValidationFunction<FødselsnummerValidationResult> => (
    value: any
): FødselsnummerValidationResult => {
    const { required, disallowedValues } = options;
    if (hasValue(value) === false && required === false) {
        return undefined;
    }
    if (hasValue(value) === false && required) {
        return ValidateRequiredValueError.noValue;
    }
    if (hasValue(value)) {
        const result = fnrvalidator.fnr(value);
        if (result.status === 'invalid') {
            /** Errors from @navikt/fnrvalidator */
            const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
            const CHECKSUM_ERROR = "checksums don't match";
            const { reasons } = result;
            if (reasons.includes(LENGTH_ERROR)) {
                return ValidateFødselsnummerError.fødselsnummerNot11Chars;
            }
            if (reasons.includes(CHECKSUM_ERROR)) {
                return ValidateFødselsnummerError.fødselsnummerChecksumError;
            }
            return ValidateFødselsnummerError.invalidFødselsnummer;
        }
        if (disallowedValues) {
            const hasConflict = disallowedValues.some((f) => f === value);
            if (hasConflict) {
                return ValidateFødselsnummerError.disallowedFødselsnummer;
            }
        }
    }
    return undefined;
};

export default validateFødselsnummer;
