import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';

export enum ValidateStringError {
    notAString = 'notAString',
    stringIsTooShort = 'stringIsTooShort',
    stringIsTooLong = 'stringIsTooLong',
}

type StringValidationResult =
    | undefined
    | ValidateRequiredFieldError.noValue
    | ValidateStringError.notAString
    | ValidateStringError.stringIsTooLong
    | ValidateStringError.stringIsTooShort;

interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const getStringValidator = (options: Options = {}): ValidationFunction<StringValidationResult> => (value: any) => {
    const { required, minLength, maxLength } = options;
    if (hasValue(value) === false && required) {
        return ValidateRequiredFieldError.noValue;
    }
    if (hasValue(value)) {
        if (typeof value !== 'string') {
            return ValidateStringError.notAString;
        }
        if (minLength !== undefined && value.length < minLength) {
            return ValidateStringError.stringIsTooShort;
        }
        if (maxLength !== undefined && value.length > maxLength) {
            return ValidateStringError.stringIsTooLong;
        }
    }
    return undefined;
};

export default getStringValidator;
