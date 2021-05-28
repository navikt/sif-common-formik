import fnrvalidator from '@navikt/fnrvalidator';
import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateFødselsnummerError {
    fødselsnummerHasNoValue = 'fødselsnummerHasNoValue',
    fødselsnummerIsNot11Chars = 'fødselsnummerIsNot11Chars',
    fødselsnummerIsInvalid = 'fødselsnummerIsInvalid',
    fødselsnummerIsNotAllowed = 'fødselsnummerIsNotAllowed',
}

type FødselsnummerValidationResult =
    | ValidateFødselsnummerError.fødselsnummerHasNoValue
    | ValidateFødselsnummerError.fødselsnummerIsNotAllowed
    | ValidateFødselsnummerError.fødselsnummerIsNot11Chars
    | ValidateFødselsnummerError.fødselsnummerIsInvalid
    | undefined;

interface Options {
    required?: boolean;
    disallowedValues?: string[];
}

const getFødselsnummerValidator =
    (options: Options = {}): ValidationFunction<FødselsnummerValidationResult> =>
    (value: any) => {
        const { required, disallowedValues } = options;
        if (hasValue(value) === false && required === false) {
            return undefined;
        }
        if (required && hasValue(value) === false) {
            return ValidateFødselsnummerError.fødselsnummerHasNoValue;
        }
        if (hasValue(value)) {
            const result = fnrvalidator.fnr(value);
            if (result.status === 'invalid') {
                /** Errors from @navikt/fnrvalidator */
                const LENGTH_ERROR = 'fnr or dnr must consist of 11 digits';
                const { reasons } = result;
                if (reasons.includes(LENGTH_ERROR)) {
                    return ValidateFødselsnummerError.fødselsnummerIsNot11Chars;
                }
                return ValidateFødselsnummerError.fødselsnummerIsInvalid;
            }
            if (disallowedValues) {
                const equalsDisallowedValue = disallowedValues.some((f) => f === value);
                if (equalsDisallowedValue) {
                    return ValidateFødselsnummerError.fødselsnummerIsNotAllowed;
                }
            }
        }
        return undefined;
    };

export default getFødselsnummerValidator;
