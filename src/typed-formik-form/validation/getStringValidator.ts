import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateStringError {
    stringHasNoValue = 'stringHasNoValue',
    stringIsNotAString = 'stringIsNotAString',
    stringIsTooShort = 'stringIsTooShort',
    stringIsTooLong = 'stringIsTooLong',
}

type StringValidationResult =
    | undefined
    | ValidateStringError.stringHasNoValue
    | ValidateStringError.stringIsNotAString
    | ValidateStringError.stringIsTooLong
    | ValidateStringError.stringIsTooShort;

interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const getStringValidator =
    (options: Options = {}): ValidationFunction<StringValidationResult> =>
    (value: any) => {
        const { required, minLength, maxLength } = options;

        if (required) {
            if (hasValue(value) === false || (typeof value === 'string' && value.trim().length === 0)) {
                return ValidateStringError.stringHasNoValue;
            }
        }

        if (hasValue(value)) {
            if (typeof value !== 'string') {
                return ValidateStringError.stringIsNotAString;
            }
            if (minLength !== undefined && value.length < minLength) {
                return ValidateStringError.stringIsTooShort;
            }
            if (maxLength !== undefined && value.length > maxLength) {
                return ValidateStringError.stringIsTooLong;
            }
        }
    };

export default getStringValidator;
