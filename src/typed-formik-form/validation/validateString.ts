import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredValueError } from './validateRequiredValue';

export enum ValidateStringError {
    notAString = 'notAString',
    stringIsTooShort = 'stringIsTooShort',
    stringIsTooLong = 'stringIsTooLong',
}

type StringValidationResult =
    | undefined
    | ValidateRequiredValueError.noValue
    | ValidateStringError.notAString
    | ValidateStringError.stringIsTooLong
    | ValidateStringError.stringIsTooShort;

interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const validateString = (options: Options = {}): ValidationFunction<StringValidationResult> => (value: any) => {
    const { required, minLength, maxLength } = options;
    if (hasValue(value) === false && required) {
        return ValidateRequiredValueError.noValue;
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

export default validateString;
