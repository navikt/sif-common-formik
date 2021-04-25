import fnrvalidator from '@navikt/fnrvalidator';
import getRequiredFieldValidator, { ValidateRequiredFieldError } from './getRequiredFieldValidator';
import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateFødselsnummerError {
    fødselsnummerNot11Chars = 'fødselsnummerNot11Chars',
    invalidFødselsnummer = 'invalidFødselsnummer',
    disallowedFødselsnummer = 'disallowedFødselsnummer',
}

type FødselsnummerValidationResult =
    | ValidateRequiredFieldError.noValue
    | ValidateFødselsnummerError.disallowedFødselsnummer
    | ValidateFødselsnummerError.fødselsnummerNot11Chars
    | ValidateFødselsnummerError.invalidFødselsnummer
    | undefined;

interface Options {
    required?: boolean;
    disallowedValues?: string[];
}

const getFødselsnummerValidator = (options: Options = {}): ValidationFunction<FødselsnummerValidationResult> => (
    value: any
) => {
    const { required, disallowedValues } = options;
    if (hasValue(value) === false && required === false) {
        return undefined;
    }
    if (required) {
        const err = getRequiredFieldValidator()(value);
        if (err) {
            return err;
        }
    }
    if (hasValue(value)) {
        const result = fnrvalidator.fnr(value);
        if (result.status === 'invalid') {
            /** Errors from @navikt/fnrvalidator */
            const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
            const { reasons } = result;
            if (reasons.includes(LENGTH_ERROR)) {
                return ValidateFødselsnummerError.fødselsnummerNot11Chars;
            }
            return ValidateFødselsnummerError.invalidFødselsnummer;
        }
        if (disallowedValues) {
            const equalsDisallowedValue = disallowedValues.some((f) => f === value);
            if (equalsDisallowedValue) {
                return ValidateFødselsnummerError.disallowedFødselsnummer;
            }
        }
    }
    return undefined;
};

export default getFødselsnummerValidator;
