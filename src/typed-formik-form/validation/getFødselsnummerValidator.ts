import fnrvalidator from '@navikt/fnrvalidator';
import { ValidationError, ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';

export enum ValidateFødselsnummerError {
    fødselsnummerNot11Chars = 'fødselsnummerNot11Chars',
    fødselsnummerChecksumError = 'fødselsnummerChecksumError',
    invalidFødselsnummer = 'invalidFødselsnummer',
    disallowedFødselsnummer = 'disallowedFødselsnummer',
}

type FødselsnummerValidationResult =
    | ValidateRequiredFieldError.noValue
    | ValidateFødselsnummerError.disallowedFødselsnummer
    | ValidateFødselsnummerError.fødselsnummerChecksumError
    | ValidateFødselsnummerError.fødselsnummerNot11Chars
    | ValidateFødselsnummerError.invalidFødselsnummer
    | ValidationError
    | undefined;

type Errors = {
    [ValidateRequiredFieldError.noValue]?: ValidateRequiredFieldError.noValue | ValidationError;
    [ValidateFødselsnummerError.disallowedFødselsnummer]?:
        | ValidateFødselsnummerError.disallowedFødselsnummer
        | ValidationError;
    [ValidateFødselsnummerError.fødselsnummerChecksumError]?:
        | ValidateFødselsnummerError.fødselsnummerChecksumError
        | ValidationError;
    [ValidateFødselsnummerError.fødselsnummerNot11Chars]?:
        | ValidateFødselsnummerError.fødselsnummerNot11Chars
        | ValidationError;
    [ValidateFødselsnummerError.invalidFødselsnummer]?:
        | ValidateFødselsnummerError.invalidFødselsnummer
        | ValidationError;
};

const defaultErrors: Errors = {
    fødselsnummerChecksumError: ValidateFødselsnummerError.fødselsnummerChecksumError,
    disallowedFødselsnummer: ValidateFødselsnummerError.disallowedFødselsnummer,
    fødselsnummerNot11Chars: ValidateFødselsnummerError.fødselsnummerNot11Chars,
    invalidFødselsnummer: ValidateFødselsnummerError.invalidFødselsnummer,
    noValue: ValidateRequiredFieldError.noValue,
};
interface Options {
    required?: boolean;
    disallowedValues?: string[];
}

const getFødselsnummerValidator = (
    options: Options = {},
    customErrors?: Errors
): ValidationFunction<FødselsnummerValidationResult> => (value: any): FødselsnummerValidationResult => {
    const { required, disallowedValues } = options;
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };
    if (hasValue(value) === false && required === false) {
        return undefined;
    }
    if (hasValue(value) === false && required) {
        return errors[ValidateRequiredFieldError.noValue];
    }
    if (hasValue(value)) {
        const result = fnrvalidator.fnr(value);
        if (result.status === 'invalid') {
            /** Errors from @navikt/fnrvalidator */
            const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
            const CHECKSUM_ERROR = "checksums don't match";
            const { reasons } = result;
            if (reasons.includes(LENGTH_ERROR)) {
                return errors[ValidateFødselsnummerError.fødselsnummerNot11Chars];
            }
            if (reasons.includes(CHECKSUM_ERROR)) {
                return errors[ValidateFødselsnummerError.fødselsnummerChecksumError];
            }
            return errors[ValidateFødselsnummerError.invalidFødselsnummer];
        }
        if (disallowedValues) {
            const equalsDisallowedValue = disallowedValues.some((f) => f === value);
            if (equalsDisallowedValue) {
                return errors[ValidateFødselsnummerError.disallowedFødselsnummer];
            }
        }
    }
    return undefined;
};

export default getFødselsnummerValidator;
